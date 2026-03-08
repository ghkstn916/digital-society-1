import { useState } from "react";
import ClassifyActivity from "../../components/interactive/ClassifyActivity";
import RevealCard from "../../components/interactive/RevealCard";
import QuizCard from "../../components/interactive/QuizCard";
import MatchingActivity from "../../components/interactive/MatchingActivity";

// 분류 실습 데이터 (강화)
const classifyItems = [
  {
    id: "military",
    label: "군사 기밀 정보 — 국가 방위와 관련된 군 작전·무기 개발 내용",
    correct: "A",
    explanation: "국가 안보에 직결되는 정보로, 외부에 유출되면 큰 피해가 발생할 수 있어 철저히 보호해야 해요.",
  },
  {
    id: "allergy",
    label: "학교 급식 알레르기 정보 — 알레르기 유발 식품 포함 여부 안내",
    correct: "B",
    explanation: "학생 건강과 안전을 위해 반드시 공개해야 하는 정보예요. 공유하지 않으면 심각한 건강 피해로 이어질 수 있어요.",
  },
  {
    id: "travel",
    label: "여행 추천지 맛집 정보 — 블로그나 SNS에 올리는 식당 후기",
    correct: "B",
    explanation: "개인 경험을 공유하는 정보로, 사람들에게 유용하고 특별히 보호할 이유가 없는 공개 정보예요.",
  },
  {
    id: "medical",
    label: "처방전·진료 기록 — 내가 어떤 약을 복용하는지, 어떤 질병이 있는지",
    correct: "A",
    explanation: "개인 의료 정보는 매우 민감한 개인정보예요. 본인의 동의 없이 타인에게 공개되면 차별이나 불이익으로 이어질 수 있어요.",
  },
  {
    id: "weather",
    label: "내일 서울 날씨 예보 — 기상청이 발표하는 공식 기상 정보",
    correct: "B",
    explanation: "날씨 정보는 모든 사람에게 알려야 하는 공공 정보예요. 더 많은 사람이 알수록 더 안전한 생활이 가능해져요.",
  },
  {
    id: "address",
    label: "집 주소와 귀가 시간 — 평소 몇 시에 집에 들어오는지",
    correct: "A",
    explanation: "집 주소와 생활 패턴이 결합되면 범죄에 악용될 수 있어요. SNS나 단체방에 올리는 건 매우 위험해요.",
  },
  {
    id: "school-event",
    label: "학교 공식 행사 일정 — 입학식, 체육대회, 졸업식 날짜",
    correct: "B",
    explanation: "학교 공식 행사 일정은 학부모와 학생 모두에게 알려야 하는 공개 정보예요.",
  },
  {
    id: "password",
    label: "SNS 계정 아이디와 비밀번호 — 내 인스타그램 로그인 정보",
    correct: "A",
    explanation: "계정 정보는 절대 타인과 공유해선 안 돼요. 친한 친구에게도 알려주면 계정 탈취나 개인정보 유출로 이어질 수 있어요.",
  },
];

// 개인 정보 유형 데이터
const personalInfoTypes = [
  { icon: "🪪", label: "이름·주민번호", desc: "기본 신원 확인" },
  { icon: "📞", label: "전화번호·주소", desc: "연락처 및 위치" },
  { icon: "🏥", label: "진료 기록", desc: "건강 상태" },
  { icon: "💳", label: "금융 정보", desc: "계좌·카드 번호" },
  { icon: "📸", label: "얼굴 사진", desc: "생체 식별 정보" },
  { icon: "📍", label: "위치 정보", desc: "이동 경로" },
];

// 이것도 개인정보일까? 사례 데이터
const personalInfoCases = [
  {
    id: "sns-profile",
    text: "인스타그램 프로필에 적은 '서울 거주, 고2, 운동 좋아함'",
    isPersonal: true,
    explanation: "혼자로는 특정이 어려워 보여도, 사진·팔로워 목록·위치 태그가 결합되면 개인 식별이 가능해져요. 온라인에 올린 정보는 생각보다 많은 것을 말해줘요.",
  },
  {
    id: "school-name",
    text: "단톡방에서 말한 '나 OO고등학교 다녀'",
    isPersonal: true,
    explanation: "학교 이름만으로는 개인 특정이 어렵지만, 학년·반·얼굴 사진이 결합되면 특정 가능해요. 공개 범위를 신경 써야 해요.",
  },
  {
    id: "playlist",
    text: "스포티파이 공개 플레이리스트 — 좋아하는 노래 목록",
    isPersonal: false,
    explanation: "스스로 공개로 설정한 음악 취향은 민감한 개인정보가 아니에요. 하지만 다른 정보와 결합해 취향 프로파일링에 쓰일 수 있으니 주의해요.",
  },
  {
    id: "location-tag",
    text: "SNS 게시물에 달린 위치 태그 — '강남역 근처'",
    isPersonal: true,
    explanation: "이동 경로가 축적되면 생활 패턴이 파악돼요. 습관적인 위치 공개는 범죄 표적이 될 수 있어요. 위치 태그는 신중하게 사용해야 해요.",
  },
];

function PersonalInfoGuessCard({ item }) {
  const [answered, setAnswered] = useState(null);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-800 mb-3 leading-relaxed">
        "{item.text}"
      </p>
      {answered === null && (
        <div className="flex gap-2">
          <button
            onClick={() => setAnswered("yes")}
            className="flex-1 py-2 rounded-xl text-sm font-semibold border-2 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
          >
            개인정보야
          </button>
          <button
            onClick={() => setAnswered("no")}
            className="flex-1 py-2 rounded-xl text-sm font-semibold border-2 border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
          >
            아닌 것 같아
          </button>
        </div>
      )}
      {answered !== null && (
        <div className={`mt-2 rounded-xl px-4 py-3 text-sm leading-relaxed ${
          (answered === "yes") === item.isPersonal
            ? "bg-green-50 border border-green-200 text-green-800"
            : "bg-orange-50 border border-orange-200 text-orange-800"
        }`}>
          <span className="font-semibold mr-1">
            {(answered === "yes") === item.isPersonal
              ? "맞아요!"
              : item.isPersonal ? "실은 개인정보에 가까워요." : "이건 공개 정보예요."}
          </span>
          {item.explanation}
        </div>
      )}
    </div>
  );
}

export default function Lesson2_1() {
  const [showPortrait, setShowPortrait] = useState(false);

  return (
    <div className="space-y-10">
      {/* 도입 — SNS 프로필 스토리 */}
      <section>
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <p className="text-blue-800 font-bold text-lg mb-2">
            모든 정보를 지켜야 할까? 모두 나눠야 할까?
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            날씨 예보는 모두에게 알려야 해요. 하지만 내 진료 기록은 아무에게나 알려선 안 되죠.
            어떤 기준으로 정보를 보호하고 공유해야 하는지 이 레슨에서 배워봐요.
          </p>
        </div>

        {/* 도입 스토리 — 이것도 개인정보? */}
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
          <p className="text-xs font-bold text-yellow-700 mb-2">잠깐, 이 상황을 생각해봐요</p>
          <p className="text-sm text-gray-800 leading-relaxed">
            <span className="font-semibold text-yellow-700">수아</span>는 인스타그램 프로필에 자신의 학교 이름, 사진, 동네 이름을 올렸어요.
            틱톡에는 "서울 강북구, 고2, 매일 7시 등교"라는 소개를 달았어요.
            어느 날 처음 보는 계정에서 "OO고 2학년 수아 맞죠?"라는 DM이 왔어요.
          </p>
          <p className="text-sm text-gray-700 mt-3 font-medium">
            수아는 왜 이런 일이 생겼을까요? 나라면 어떤 느낌이 들까요?
          </p>
        </div>
      </section>

      {/* 개념 — 정보 보호 vs 공유 */}
      <section>
        <h2 className="text-xl font-black text-gray-800 mb-4">
          두 가지 기본 개념
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🔒</span>
              <p className="font-black text-red-700 text-lg">정보 보호</p>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              컴퓨터나 네트워크 상의 위협으로부터
              <strong> 정보가 유출·변경·파괴되지 않도록</strong> 지키는 것이에요.
            </p>
            <div className="bg-white rounded-xl p-3 space-y-1">
              <p className="text-xs font-bold text-red-600 mb-1">보호해야 할 예시</p>
              {["군사 기밀 정보", "기업 기술 개발 정보", "개인 정보"].map((ex) => (
                <p key={ex} className="text-xs text-gray-600 flex gap-2">
                  <span className="text-red-400">🔐</span>{ex}
                </p>
              ))}
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌐</span>
              <p className="font-black text-green-700 text-lg">정보 공유</p>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              자신이 가진 정보를 다른 사람에게 <strong>알리거나 나누는</strong> 것이에요.
              공공의 이익을 위해 꼭 필요한 정보들이 있어요.
            </p>
            <div className="bg-white rounded-xl p-3 space-y-1">
              <p className="text-xs font-bold text-green-600 mb-1">공유해야 할 예시</p>
              {["날씨·재난 정보", "진로·진학 정보", "각종 공공 데이터"].map((ex) => (
                <p key={ex} className="text-xs text-gray-600 flex gap-2">
                  <span className="text-green-400">📢</span>{ex}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 개념 — 개인 정보 */}
      <section>
        <h2 className="text-xl font-black text-gray-800 mb-4">
          개인 정보란?
        </h2>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 mb-4">
            <p className="text-sm text-yellow-900 font-semibold leading-relaxed">
              개인 정보 = 살아있는 개인에 관한 정보로,
              그 정보만으로 또는 다른 정보와 결합했을 때 <strong>특정 개인을 식별할 수 있는 것</strong>
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {personalInfoTypes.map((t, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-3 bg-gray-50 rounded-xl"
              >
                <span className="text-2xl">{t.icon}</span>
                <p className="text-xs font-semibold text-gray-700 mt-1 leading-tight">
                  {t.label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{t.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <p className="text-xs text-red-800 leading-relaxed">
              <span className="font-bold">주의:</span> 한 번 공유된 정보는 되돌리기 어려워요.
              정보를 공유할 때는 반드시 보호 조치(암호화, 접근 제한 등)를 함께 고려해야 해요.
            </p>
          </div>
        </div>
      </section>

      {/* 실습 — 이것도 개인정보일까? */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
            실습
          </span>
          <h2 className="text-xl font-black text-gray-800">
            이것도 개인정보일까?
          </h2>
        </div>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          우리가 SNS나 메신저에서 자주 공유하는 정보들이에요.
          각각이 개인정보에 해당하는지 직접 판단해봐요.
        </p>
        <div className="space-y-3">
          {personalInfoCases.map((item) => (
            <PersonalInfoGuessCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* 생각해보기 — 정보 유출 피해 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
            생각해보기
          </span>
          <h2 className="text-xl font-black text-gray-800">
            정보가 유출되면 어떻게 될까?
          </h2>
        </div>
        <RevealCard
          prompt="내 전화번호, 이름, 학교, 집 근처 위치 정보가 유출됐다고 가정해봐요. 어떤 일이 생길 수 있을까요? 잠깐 떠올려본 뒤 실제 피해 사례를 확인해봐요."
          answerLabel="실제 피해 유형 보기"
          answer="생각보다 훨씬 많은 피해가 생길 수 있어요."
          explanation="① 스팸 전화·문자 폭발: 전화번호가 유출되면 보이스피싱·스팸이 쏟아져요. ② 타깃 피싱: 이름·학교 정보를 안다면 '선생님인 척', '학교 공지인 척' 속이는 피싱이 가능해져요. ③ 스토킹 위험: 집 근처 위치 + 귀가 시간 정보가 결합되면 스토킹 범죄에 노출될 수 있어요. ④ 온라인 사기: 이름·주소로 택배 사기, 명의 도용이 가능해져요. 한 번 유출된 정보는 인터넷 어딘가에 계속 남아요."
        />
      </section>

      {/* 실습 — 분류하기 (강화) */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
            실습
          </span>
          <h2 className="text-xl font-black text-gray-800">
            이 정보, 보호해야 할까? 공유해야 할까?
          </h2>
        </div>
        <p className="text-gray-600 text-sm mb-1 leading-relaxed">
          아래 8가지 정보를 읽고, 각각 '보호해야 할 정보'인지 '공유해야 할 정보'인지 선택해보세요.
        </p>
        <p className="text-gray-500 text-xs mb-4">
          판단 기준: 공개됐을 때 나 또는 타인에게 피해가 생기는 정보인가요? 아니면 모두에게 알려야 유익한 정보인가요?
        </p>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <ClassifyActivity
            items={classifyItems}
            categoryA={{ label: "보호해야 할 정보", color: "red" }}
            categoryB={{ label: "공유해야 할 정보", color: "blue" }}
            instruction="각 정보가 어느 쪽에 해당하는지 선택해보세요."
          />
        </div>
      </section>

      {/* 초상권 사례 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
            사례 분석
          </span>
          <h2 className="text-xl font-black text-gray-800">
            초상권 이야기
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
            <p className="text-sm text-gray-800 leading-relaxed">
              <span className="text-orange-600 font-bold">[상황]</span> 유튜버 A가 식당에서 콘텐츠를 촬영하면서
              주변 손님들의 얼굴이 화면에 담겼어요. A는 "공개 장소니까 괜찮다"고 생각했어요.
            </p>
          </div>

          <RevealCard
            prompt="A의 생각이 맞는 걸까요? 공개 장소에서 찍힌 영상을 허락 없이 올려도 될까요?"
            answerLabel="정답 확인하기"
            answer="아니요, 이건 초상권 침해에 해당할 수 있어요."
            explanation="공개 장소라도 개인의 얼굴이 찍혀 동의 없이 공개되면 초상권 침해가 돼요. 초상권은 자신의 얼굴이나 모습이 허락 없이 촬영·공개되지 않을 권리로, 모든 사람에게 있어요. 촬영 전에 반드시 주변 사람들의 동의를 받거나, 편집 시 얼굴을 가려야 해요."
          />
        </div>
      </section>

      {/* 퀴즈 — 개인 정보 해당 여부 */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
            퀴즈
          </span>
          <h2 className="text-xl font-black text-gray-800">이것도 개인 정보일까?</h2>
        </div>

        <QuizCard
          question="수진이는 학교 커뮤니티 앱에 '서울 강북구 00고등학교 2학년 3반 반장'이라고 자신을 소개했어요. 이 정보는 개인 정보에 해당할까요?"
          options={[
            {
              label: "아니요 — 학교 이름이나 반 정보는 개인 정보가 아니에요",
              correct: false,
              explanation: "학교 이름, 학년, 반 정보가 결합되면 특정 개인을 좁혀나갈 수 있어요. 단독으로는 괜찮아도 조합되면 식별이 가능해져요.",
            },
            {
              label: "네 — 여러 정보가 결합되면 특정 개인을 식별할 수 있기 때문이에요",
              correct: true,
              explanation: "학교 + 학년 + 반 + 직책이 조합되면 해당 학교에서 수진이를 찾을 수 있어요. 개인 정보는 단독 정보가 아니라 '결합했을 때 개인을 특정할 수 있는 정보'도 포함해요.",
            },
            {
              label: "모르겠어요 — 이름이 없으니까 개인 정보가 아니에요",
              correct: false,
              explanation: "이름이 없어도 조합 정보로 개인을 특정할 수 있으면 개인 정보에 해당해요. 이름은 개인 정보의 필수 요건이 아니에요.",
            },
            {
              label: "아니요 — 커뮤니티 앱에 스스로 올렸으니 보호 대상이 아니에요",
              correct: false,
              explanation: "스스로 공개했다고 해서 개인 정보가 아닌 건 아니에요. 본인이 공개한 정보라도 무단으로 수집·활용하면 개인 정보 침해예요.",
            },
          ]}
          hint="단독 정보가 아닌 '조합'이 핵심이에요."
        />
      </section>

      {/* 실습 — 정보 유형-보호 방법 매칭 */}
      <section>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
            실습
          </span>
          <h2 className="text-xl font-black text-gray-800">
            이 정보, 어떻게 보호할까?
          </h2>
        </div>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          왼쪽의 개인 정보 유형과 오른쪽의 보호 방법을 올바르게 연결해봐요.
        </p>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <MatchingActivity
            pairs={[
              {
                leftId: "pw",
                leftLabel: "SNS 계정 정보",
                rightId: "r-pw",
                rightLabel: "2단계 인증을 설정하고 비밀번호를 정기적으로 변경해요",
              },
              {
                leftId: "photo",
                leftLabel: "얼굴 사진",
                rightId: "r-photo",
                rightLabel: "SNS 업로드 전 공개 범위를 '친구만'으로 설정해요",
              },
              {
                leftId: "location",
                leftLabel: "위치 정보",
                rightId: "r-location",
                rightLabel: "앱의 위치 접근 권한을 '사용 중에만'으로 제한해요",
              },
              {
                leftId: "medical",
                leftLabel: "진료·건강 기록",
                rightId: "r-medical",
                rightLabel: "종이 문서는 파쇄하고 전자 파일은 암호화해서 보관해요",
              },
            ]}
            leftTitle="개인 정보 유형"
            rightTitle="보호 방법"
            instruction="각 정보 유형에 맞는 보호 방법을 연결해봐요."
          />
        </div>
      </section>

      {/* 정리 */}
      <section>
        <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-2xl p-6">
          <h2 className="text-base font-black text-blue-800 mb-3">
            이번 레슨에서 배운 것
          </h2>
          <ul className="space-y-2">
            {[
              "정보 보호: 위협으로부터 정보를 지키는 것 (군사 기밀, 기업 기술, 개인 정보 등)",
              "정보 공유: 공공의 이익을 위해 알려야 하는 정보 (날씨, 재난, 진로 정보 등)",
              "개인 정보: 특정 개인을 식별할 수 있는 모든 정보 — 단독으로 또는 조합해서도 해당",
              "한 번 유출된 정보는 되돌리기 어렵기 때문에 공유 전 신중하게 생각해야 해요.",
              "초상권: 공개 장소에서도 사전 동의 없는 촬영·공개는 불법이에요.",
              "SNS에 올리는 정보도 개인정보가 될 수 있어요 — 위치, 학교, 패턴 조합에 주의해요.",
            ].map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="text-blue-500 shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
