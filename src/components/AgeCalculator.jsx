import { useState } from "react";
import { useForm } from "react-hook-form";
import iconArrow from "../assets/images/icon-arrow.svg";

export const AgeCalculator = () => {
  const [day, setDay] = useState("--");
  const [month, setMonth] = useState("--");
  const [year, setYear] = useState("--");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const currentDate = new Date();

    const currentDay = currentDate.getDay();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const dayBorn = Number(data.day);
    const monthBorn = Number(data.month);
    const yearBorn = Number(data.year);

    let day = currentDay - dayBorn;
    let month = currentMonth - monthBorn;
    let year = currentYear - yearBorn;

    if (day < 0) {
      month--;
      const previousMonth = new Date(
        currentYear,
        currentMonth - 1,
        0,
      ).getDate();
      day += previousMonth;
    }

    if (month < 0) {
      year--;
      month += 12;
    }

    setYear(year);
    setMonth(month);
    setDay(day);

    const date = new Date(yearBorn, monthBorn - 1, dayBorn);

    const isValidDate =
      date.getFullYear() === yearBorn &&
      date.getMonth() === monthBorn - 1 &&
      date.getDate() === dayBorn;

    if (!isValidDate) {
      setError("day", {
        type: "manual",
        message: "Must be a valid date",
      });
      setError("month", {
        type: "manual",
        message: "Must be a valid date",
      });
      setError("year", {
        type: "manual",
        message: "Must be a valid date",
      });
      return;
    }
  };

  return (
    <div className="font-poppins pl-6 md:pl-14 pr-10 md:pr-14 pt-10 md:pt-14 pb-14 md:pb-16 max-w-sm md:max-w-xl lg:max-w-4xl rounded-3xl rounded-br-[108px] md:rounded-br-[192px] bg-neutral-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="pb-14 flex items-center justify-between relative gap-3 md:gap-8 border-b-2 border-neutral-200"
      >
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="day"
            className={`font-bold uppercase tracking-widest text-sm md:text-base ${errors.day ? "text-primary-red-400" : "text-neutral-500"}`}
          >
            Dia
          </label>
          <input
            id="day"
            type="text"
            {...register("day", {
              required: "This field is required",
              min: { value: 1, message: "Must be a valid day" },
              max: { value: 31, message: "Must be a valid day" },
            })}
            placeholder="DD"
            inputMode="numeric"
            onChange={(e) => e.target.value.replace(/\D/g, "")}
            className={`w-20 md:w-32 lg:w-40 py-3 md:py-4 px-4 md:px-6 text-xl md:text-4xl font-extrabold rounded-xl border text-neutral-black ${errors?.day ? "border-primary-red-400" : "border-neutral-200"} focus:border-primary-purple-500 focus:outline-0 placeholder:text-neutral-500`}
          />
          {errors?.day && (
            <small className="text-xs italic text-primary-red-400">
              {errors.day.message}
            </small>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="month"
            className={`font-bold uppercase tracking-widest text-sm md:text-base ${errors?.month ? "text-primary-red-400" : "text-neutral-500"}`}
          >
            Mês
          </label>
          <input
            id="month"
            type="text"
            {...register("month", {
              required: "This field is required",
              min: { value: 1, message: "Must be a valid month" },
              max: { value: 12, message: "Must be a valid month" },
            })}
            placeholder="MM"
            inputMode="numeric"
            onChange={(e) => e.target.value.replace(/\D/g, "")}
            className={`w-20 md:w-32 lg:w-40 py-3 md:py-4 px-4 md:px-6 text-xl md:text-4xl font-extrabold rounded-xl border text-neutral-black ${errors?.month ? "border-primary-red-400" : "border-neutral-200"} focus:border-primary-purple-500 focus:outline-0 placeholder:text-neutral-500`}
          />
          {errors?.month && (
            <span className="text-xs italic text-primary-red-400">
              {errors.month.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="year"
            className={`font-bold uppercase tracking-widest text-sm md:text-base ${errors?.year ? "text-primary-red-400" : "text-neutral-500"}`}
          >
            Ano
          </label>
          <input
            id="year"
            type="text"
            {...register("year", {
              required: "This field is required",
              min: { value: 1900, message: "Year must be after 1900" },
              max: {
                value: new Date().getFullYear(),
                message: "Must be in the past",
              },
            })}
            placeholder="AAAA"
            inputMode="numeric"
            onChange={(e) => e.target.value.replace(/\D/g, "")}
            className={`w-22 md:w-40 py-3 md:py-4 px-4 md:px-6 text-xl md:text-4xl font-extrabold rounded-xl border text-neutral-black ${errors?.year ? "border-primary-red-400" : "border-neutral-200"} focus:border-primary-purple-500 focus:outline-0 placeholder:text-neutral-500`}
          />
          {errors?.year && (
            <span className="text-xs italic text-primary-red-400">
              {errors.year.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="w-16 md:w-20 h-16 md:h-20 cursor-pointer flex items-center justify-center rounded-full absolute top-26 md:top-30 left-[40%] md:left-[45%] lg:left-11/12 transition bg-primary-purple-500 hover:bg-neutral-black"
        >
          <img
            src={iconArrow}
            alt="Icon Arrow"
            className="w-10 md:w-12 h-8 md:h-10"
          />
        </button>
      </form>
      <section className="pt-12 md:pt-10">
        <div className="font-bold italic text-[52px]/18 md:text-[92px]/24 flex items-center gap-3">
          <span className="text-primary-purple-500">{year}</span>
          <strong>anos</strong>
        </div>
        <div className="font-bold italic text-[52px]/18 md:text-[92px]/24 flex items-center gap-3">
          <span className="text-primary-purple-500">{month}</span>
          <strong>meses</strong>
        </div>
        <div className="font-bold italic text-[52px]/18 md:text-[92px]/24 flex items-center gap-3">
          <span className="text-primary-purple-500">{day}</span>
          <strong>dias</strong>
        </div>
      </section>
    </div>
  );
};
