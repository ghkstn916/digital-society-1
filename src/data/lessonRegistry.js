export const modules = [
  {
    id: 1,
    title: "디지털 사회와 진로",
    description: "디지털 기술이 우리 사회와 직업을 어떻게 바꾸고 있는지 탐구해요",
    color: "green",
    icon: "🌐",
    lessons: [
      {
        id: "1-1",
        title: "디지털 기술과 사회 변화",
        duration: 20,
        description: "디지털 사회로의 변화 흐름을 이해하고 기술의 두 얼굴을 살펴봐요",
      },
      {
        id: "1-2",
        title: "디지털 사회의 직업과 진로",
        duration: 20,
        description: "사라지는 직업, 새로 생기는 직업, 그리고 내 미래를 생각해봐요",
      },
      {
        id: "1-3",
        title: "디지털 사회와 진로 마무리 퀴즈",
        duration: 15,
        description: "디지털 기술과 사회 변화, 직업과 진로 내용을 모두 되짚는 마무리 퀴즈예요",
      },
    ],
  },
  {
    id: 2,
    title: "정보 보호와 정보 공유",
    description: "지켜야 할 정보와 나눠야 할 정보를 구분하고 내 정보를 안전하게 지켜요",
    color: "blue",
    icon: "🔒",
    lessons: [
      {
        id: "2-1",
        title: "보호해야 할 정보와 공유해야 할 정보",
        duration: 20,
        description: "어떤 정보를 지키고 어떤 정보를 나눠야 하는지 사례로 배워요",
      },
      {
        id: "2-2",
        title: "올바른 정보 보호 방법",
        duration: 20,
        description: "디지털 위협의 종류와 나를 지키는 실천 방법을 알아봐요",
      },
      {
        id: "2-3",
        title: "정보 보호와 정보 공유 마무리 퀴즈",
        duration: 15,
        description: "개인정보 보호, 정보 공유 판단, 디지털 위협 대처법을 점검하는 마무리 퀴즈예요",
      },
    ],
  },
  {
    id: 3,
    title: "정보 보안",
    description: "정보 보안의 3대 요소를 이해하고 디지털 윤리를 실천해요",
    color: "purple",
    icon: "🛡️",
    lessons: [
      {
        id: "3-1",
        title: "정보 보안의 개념과 필요성",
        duration: 20,
        description: "정보 보안이란 무엇인지, 왜 필요한지 사례로 확인해요",
      },
      {
        id: "3-2",
        title: "디지털 윤리와 안전한 디지털 사회",
        duration: 25,
        description: "디지털 사회에서 우리가 지켜야 할 윤리와 규칙을 탐구해요",
      },
      {
        id: "3-3",
        title: "정보 보안 마무리 퀴즈",
        duration: 15,
        description: "정보 보안 3대 요소, 보안 위협 유형, 디지털 윤리를 모두 점검하는 마무리 퀴즈예요",
      },
    ],
  },
];

// 전체 레슨 플랫 배열 (이전/다음 네비게이션용)
export const allLessons = modules.flatMap((mod) =>
  mod.lessons.map((lesson) => ({
    ...lesson,
    moduleId: mod.id,
    moduleTitle: mod.title,
    moduleColor: mod.color,
  }))
);

export function getLessonById(lessonId) {
  return allLessons.find((l) => l.id === lessonId) || null;
}

export function getAdjacentLessons(lessonId) {
  const idx = allLessons.findIndex((l) => l.id === lessonId);
  return {
    prev: idx > 0 ? allLessons[idx - 1] : null,
    next: idx < allLessons.length - 1 ? allLessons[idx + 1] : null,
  };
}

export function getModuleById(moduleId) {
  return modules.find((m) => m.id === moduleId) || null;
}
