import {
  HolidayCache,
  HolidaysResponse,
  NextHoliday,
} from "@/app/components/types";
import { useEffect, useState } from "react";

const CACHE_KEY = "next-holiday";

export const useNextHoliday = () => {
  const [holiday, setHoliday] = useState<NextHoliday | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const today = new Date();
        const todayKey = today.toISOString().split("T")[0];
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsedCache: HolidayCache = JSON.parse(cached);
          if (parsedCache.date === todayKey) {
            setHoliday(parsedCache.holiday);
            setLoading(false);
            return;
          }
        }
        const year = today.getFullYear();
        const response = await fetch(
          `https://api.feriados.io/v1/CL/holidays/${year}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_FERIADOS_API_TOKEN}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error("Error fetching holidays");
        }

        const result: HolidaysResponse = await response.json();
        if (!result.success) {
          throw new Error("API returned an error");
        }
        const nextHoliday = result.data
          .filter((holiday) => holiday.type === "national")
          .filter((holiday) => new Date(holiday.date) >= today)
          .sort((a, b) => a.date.localeCompare(b.date))[0];

        if (!nextHoliday) {
          setHoliday(null);

          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({
              date: todayKey,
              holiday: null,
            }),
          );
          return;
        }

        const holidayDate = new Date(nextHoliday.date);
        const daysUntil = Math.ceil(
          (holidayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
        );
        const nextHolidayData: NextHoliday = {
          name: nextHoliday.name,
          days_until: daysUntil,
        };
        setHoliday(nextHolidayData);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            date: todayKey,
            holiday: nextHolidayData,
          }),
        );
      } catch (error) {
        console.error("Error fetching holidays:", error);
        setHoliday(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, []);

  return {
    holiday,
    loading,
  };
};
