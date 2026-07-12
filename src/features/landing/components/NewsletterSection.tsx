import { Mail } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="pb-14 px-4 md:px-8">

      <div className="max-w-7xl mx-auto">

        <div
          className="
          bg-white
          rounded-3xl
          border
          shadow-sm
          px-8
          py-8
          flex
          flex-col
          lg:flex-row
          items-center
          justify-between
          gap-8
          "
        >

          {/* Left */}

          <div className="flex items-center gap-6">

            <div
              className="
              w-20
              h-20
              rounded-full
              bg-blue-50
              flex
              items-center
              justify-center
              "
            >
              <Mail
                size={34}
                className="text-blue-600"
              />
            </div>

            <div>

              <h2 className="text-3xl font-bold text-slate-900">
                Stay Updated
              </h2>

              <p className="mt-2 text-gray-500">
                Subscribe to receive updates, product announcements and
                credential verification news.
              </p>

            </div>

          </div>

          {/* Right */}

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto">

            <input
              type="email"
              placeholder="Enter your email"
              className="
              w-full
              min-w-0
              flex-1
              border
              rounded-2xl
              px-5
              py-4
              outline-none
              focus:border-red-500
              "
            />

            <button
              className="
              w-full
              rounded-2xl
              bg-red-600
              px-8
              py-4
              text-white
              transition
              hover:bg-red-700
              sm:w-auto
              "
            >
              Subscribe
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}