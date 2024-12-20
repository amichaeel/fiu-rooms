import React from 'react';
import { MapPin } from 'lucide-react';

export default function Course({ course }) {
  const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(
    course.location
  )}`;

  return (
    <div className="collapse rounded-none collapse-arrow text-base-content border-b border-base-content/10">
      <input type="checkbox" className="peer" />
      <div className="collapse-title h-0">
        <div className="grid grid-cols-[1fr,auto] items-center gap-4 h-full">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="font-medium text-xs whitespace-nowrap">
              {course["class name"].split(" - ")[0]}
            </div>
            <div className="text-base-content/70 text-xs truncate">
              {course["class name"].split(" - ")[1]}
            </div>
          </div>
          <div className="flex-shrink-0 justify-self-end">
            <div className="flex items-center gap-2 rounded-md bg-base-100/30 px-2 py-1 text-xs">
              <span className="text-base-content/70 whitespace-nowrap">
                {course.time}
              </span>
            </div>
          </div>

        </div>
      </div>

      <div className="collapse-content">
        <div className="pt-4 px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course Details Section */}
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-3">
                <div className="flex flex-col">
                  <span className="text-xs text-base-content/50 uppercase">Course Name</span>
                  <span className="text-sm">
                    {course["class name"].split(" - ")[1] || course["class name"]}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-base-content/50 uppercase">Instructor</span>
                  <span className="text-sm">{course.instructors}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-base-content/50 uppercase">Dates</span>
                  <span className="text-sm">{course.dates}</span>
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="flex flex-col space-y-3 md:border-l md:border-base-content/10 md:pl-6">
              <div className="flex flex-col">
                <span className="text-xs text-base-content/50 uppercase">Location</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{course.location}</span>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-sm btn-circle"
                  >
                    <MapPin className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-xs text-base-content/50 uppercase">Campus</span>
                <span className="text-sm">{course.campus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}