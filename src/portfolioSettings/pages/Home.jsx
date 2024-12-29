
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { HeroSection } from "../components/home/HeroSection";

export const Home = () => {
  const { t } = useTranslation();

  const [pageData, setPageData] = useState({
    header: { logo: "https://via.placeholder.com/150" },
    hero: {
      title: t("hero.title"),
      subtitle: t("hero.subtitle"),
      background: "https://via.placeholder.com/800x400",
    },
    sections: [
      {
        id: "services",
        title: t("sections.servicesTitle"),
        items: [
          {
            icon: "https://via.placeholder.com/50",
            title: t("services.service1"),
            description: t("services.service1Desc"),
          },
          {
            icon: "https://via.placeholder.com/50",
            title: t("services.service2"),
            description: t("services.service2Desc"),
          },
        ],
      },
      {
        id: "testimonials",
        title: t("sections.testimonialsTitle"),
        items: [
          {
            image: "https://via.placeholder.com/100",
            text: t("testimonials.text1"),
            name: t("testimonials.name1"),
          },
          {
            image: "https://via.placeholder.com/100",
            text: t("testimonials.text2"),
            name: t("testimonials.name2"),
          },
        ],
      },
    ],
  });

  const updateContent = (sectionId, key, value, itemId = null) => {
    if (
      sectionId === "header" ||
      sectionId === "footer" ||
      sectionId === "hero"
    ) {
      setPageData((prev) => ({
        ...prev,
        [sectionId]: {
          ...prev[sectionId],
          [key]: value,
        },
      }));
    } else {
      setPageData((prev) => ({
        ...prev,
        sections: prev.sections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                items: itemId
                  ? section.items.map((item, index) =>
                      index === itemId ? { ...item, [key]: value } : item
                    )
                  : section.items,
              }
            : section
        ),
      }));
    }
  };

  return (
    <div className="min-h-screen">
      <HeroSection />

      {pageData.sections.map((section) => (
        <section
          key={section.id}
          className="p-6 bg-white shadow-lg mt-6 rounded-lg"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {section.items.map((item, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-md hover:shadow-xl transition duration-300"
              >
                <img
                  src={item.icon || item.image}
                  alt={item.title}
                  className="h-16 mb-2"
                />
                <input
                  type="text"
                  value={item.title || item.name}
                  onChange={(e) =>
                    updateContent(section.id, "title", e.target.value, index)
                  }
                  className="w-full bg-transparent border-b-2 border-gray-300 text-lg font-bold focus:outline-none placeholder-gray-400"
                  placeholder={t("placeholders.EnterExtraDetailsEn")}
                />
                <textarea
                  value={item.description || item.text}
                  onChange={(e) =>
                    updateContent(
                      section.id,
                      "description",
                      e.target.value,
                      index
                    )
                  }
                  className="w-full bg-transparent border-b-2 border-gray-300 mt-2 focus:outline-none placeholder-gray-400"
                  placeholder={t("placeholders.EnterDescriptionEn")}
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
