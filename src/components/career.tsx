import { professionalItems, academicItems } from "@/lib//career";

export default function Career() {
  const items = (title, description, time) => (
    <div className="group relative min-h-72 snap-center space-y-4 rounded-2xl border border-border p-6 duration-300 hover:bg-card lg:w-auto lg:p-8 hover:lg:scale-105">
      <div className="text-lg text-title sm:text-xl">{title}</div>
      <div className="w-52 pb-8 ms:text-lg lg:w-auto">{description}</div>
      <div className="absolute right-0 bottom-0 p-6 text-right text-primary">
        {time}
      </div>
    </div>
  );

  const section = (title, itemsList) => (
    <div className="space-y-4" data-aos="zoom-in-up">
      <div className="font-extrabold text-title text-xl sm:text-2xl lg:px-6">
        {title}
      </div>
      <div className="flex w-90 snap-x gap-6 overflow-x-scroll lg:w-auto lg:flex-col lg:overflow-hidden lg:p-6">
        {itemsList.map(item => (
          <div key={item.id}>
            {items(item.title, item.description, item.time)}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 lg:items-center lg:justify-center">
      <div
        className="w-52 rounded-2xl bg-card py-2 text-center font-bold text-lg text-primary"
        data-aos="fade-left"
      >
        💼 Кар'єра
      </div>

      <div
        className="font-extrabold text-2xl text-title sm:text-4xl"
        data-aos="fade-left"
      >
        Кар'єра та навчання
      </div>

      <div className="space-y-10 lg:grid lg:grid-cols-2 lg:gap-8 2lg:gap-24 lg:space-y-0">
        {section("Професійна сфера", professionalItems)}
        {section("Академічний", academicItems)}
      </div>
    </div>
  );
}
