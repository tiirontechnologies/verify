export default function AdvertisementPreview() {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-bold">
        Advertisement Preview
      </h2>

      <div className="mt-8 aspect-[16/6] rounded-3xl bg-gradient-to-r from-red-600 via-red-500 to-orange-400 p-12 text-white">
        <div className="flex h-full flex-col justify-center">
          <p className="text-lg opacity-90">
            Limited Time Opportunity
          </p>

          <h1 className="mt-4 text-5xl font-bold">
            Summer Internship 2026
          </h1>

          <p className="mt-6 max-w-xl text-lg opacity-90">
            Enroll now and receive an industry-recognized internship
            certificate after successful completion.
          </p>

          <button className="mt-8 w-fit rounded-xl bg-white px-6 py-3 font-semibold text-red-600">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}