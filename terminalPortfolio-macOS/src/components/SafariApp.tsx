import { useEffect, useRef, useState } from "react";
import { Gauge, Loader2, RotateCcw, Search, Trophy } from "lucide-react";
import { useTranslation } from "react-i18next";

const RACE_DURATION_SECONDS = 35;
const LUCAS_WPM = 68;
const MIN_TEXT_LENGTH = 90;
const MAX_TEXT_LENGTH = 220;

const fallbackRaceTexts = [
  "Building useful products means balancing speed, quality, and clear communication every single day.",
];

type Winner = "player" | "lucas" | "draw" | null;

function sanitizeSentence(text: string) {
  return text.replace(/\s+/g, " ").trim();
}

function clampSentenceLength(text: string) {
  if (text.length <= MAX_TEXT_LENGTH) {
    return text;
  }

  const clipped = text.slice(0, MAX_TEXT_LENGTH);
  const lastSpace = clipped.lastIndexOf(" ");

  if (lastSpace < MIN_TEXT_LENGTH) {
    return `${clipped.trim()}.`;
  }

  return `${clipped.slice(0, lastSpace).trim()}.`;
}

async function fetchWikipediaSentence(language: "en" | "pt") {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch(
      `https://${language}.wikipedia.org/api/rest_v1/page/random/summary`,
      {
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json() as { extract?: string };
    const sentence = clampSentenceLength(sanitizeSentence(data.extract ?? ""));

    if (sentence.length < MIN_TEXT_LENGTH) {
      return null;
    }

    return sentence;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function countCorrectPrefix(typed: string, target: string) {
  let count = 0;

  while (count < typed.length && count < target.length && typed[count] === target[count]) {
    count += 1;
  }

  return count;
}

export default function SafariApp() {
  const { t, i18n } = useTranslation();
  const [raceIndex, setRaceIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [elapsedMs, setElapsedMs] = useState(0);
  const [raceStarted, setRaceStarted] = useState(false);
  const [winner, setWinner] = useState<Winner>(null);
  const [internetText, setInternetText] = useState<string | null>(null);
  const [isFetchingText, setIsFetchingText] = useState(false);
  const [pasteBlocked, setPasteBlocked] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const translatedRaceTexts = t("safari.raceTexts", { returnObjects: true });
  const raceTexts = Array.isArray(translatedRaceTexts) && translatedRaceTexts.length > 0
    ? translatedRaceTexts
    : fallbackRaceTexts;
  const safeRaceIndex = raceIndex % raceTexts.length;

  const targetText = internetText ?? raceTexts[safeRaceIndex];
  const correctChars = countCorrectPrefix(typedText, targetText);
  const typedChars = typedText.length;
  const correctTypedChars = typedText
    .split("")
    .filter((char, index) => char === targetText[index]).length;

  const elapsedSeconds = elapsedMs / 1000;
  const timeLeft = Math.max(0, RACE_DURATION_SECONDS - elapsedSeconds);
  const lucasChars = Math.min(
    targetText.length,
    Math.floor((LUCAS_WPM * 5 * elapsedSeconds) / 60)
  );

  const accuracy = typedChars > 0 ? Math.round((correctTypedChars / typedChars) * 100) : 100;
  const playerWpm = elapsedSeconds > 0
    ? Math.round((correctChars / 5) / (elapsedSeconds / 60))
    : 0;

  useEffect(() => {
    inputRef.current?.focus();
  }, [raceIndex, i18n.resolvedLanguage]);

  useEffect(() => {
    setRaceIndex(0);
    setTypedText("");
    setElapsedMs(0);
    setRaceStarted(false);
    setWinner(null);
    setInternetText(null);
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    void loadInternetText(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    if (!raceStarted || winner) {
      return;
    }

    const timer = window.setInterval(() => {
      setElapsedMs((previous) => previous + 100);
    }, 100);

    return () => window.clearInterval(timer);
  }, [raceStarted, winner]);

  useEffect(() => {
    if (!raceStarted || winner) {
      return;
    }

    if (correctChars >= targetText.length && lucasChars >= targetText.length) {
      setWinner("draw");
      return;
    }

    if (correctChars >= targetText.length) {
      setWinner("player");
      return;
    }

    if (lucasChars >= targetText.length) {
      setWinner("lucas");
      return;
    }

    if (timeLeft <= 0) {
      if (correctChars > lucasChars) {
        setWinner("player");
      } else if (lucasChars > correctChars) {
        setWinner("lucas");
      } else {
        setWinner("draw");
      }
    }
  }, [correctChars, lucasChars, raceStarted, targetText.length, timeLeft, winner]);

  function resetRace(nextIndex?: number, nextInternetText?: string | null) {
    setRaceIndex(nextIndex ?? safeRaceIndex);
    setTypedText("");
    setElapsedMs(0);
    setRaceStarted(false);
    setWinner(null);

    if (nextInternetText !== undefined) {
      setInternetText(nextInternetText);
    }

    window.setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }

  function handleChange(value: string) {
    if (winner) {
      return;
    }

    const limitedValue = value.slice(0, targetText.length);

    if (!raceStarted && limitedValue.length > 0) {
      setRaceStarted(true);
    }

    setTypedText(limitedValue);
  }

  function showPasteBlockedWarning() {
    setPasteBlocked(true);
    window.setTimeout(() => setPasteBlocked(false), 1500);
  }

  function handlePaste(event: React.ClipboardEvent<HTMLTextAreaElement>) {
    event.preventDefault();
    showPasteBlockedWarning();
  }

  function handleDrop(event: React.DragEvent<HTMLTextAreaElement>) {
    event.preventDefault();
    showPasteBlockedWarning();
  }

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    const key = event.key.toLowerCase();
    const isPasteShortcut = (event.metaKey || event.ctrlKey) && key === "v";
    const isShiftInsert = event.shiftKey && event.key === "Insert";

    if (isPasteShortcut || isShiftInsert) {
      event.preventDefault();
      showPasteBlockedWarning();
    }
  }

  function nextRace() {
    void loadInternetText();
  }

  async function loadInternetText(initialLoad = false) {
    setIsFetchingText(true);

    const language = i18n.resolvedLanguage === "pt" ? "pt" : "en";
    const attempts = 2;
    let randomSentence: string | null = null;

    for (let attempt = 0; attempt < attempts && !randomSentence; attempt += 1) {
      randomSentence = await fetchWikipediaSentence(language);
    }

    if (randomSentence) {
      if (initialLoad) {
        resetRace(undefined, randomSentence);
      } else {
        resetRace(undefined, randomSentence);
      }
    } else if (!initialLoad) {
      const nextIndex = (safeRaceIndex + 1) % raceTexts.length;
      resetRace(nextIndex, null);
    }

    setIsFetchingText(false);
  }

  function renderResult() {
    if (winner === "player") {
      return t("safari.result.player");
    }

    if (winner === "lucas") {
      return t("safari.result.lucas");
    }

    if (winner === "draw") {
      return t("safari.result.draw");
    }

    return t("safari.result.idle");
  }

  return (
    <div className="h-full w-full overflow-hidden bg-[#f6f7fb] text-slate-900">
      <div className="flex h-14 items-center gap-3 border-b border-slate-200 bg-white px-4">
        <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-500">
          <Search size={14} />
          <span>{t("safari.address")}</span>
        </div>
        <div className="ml-auto flex items-center gap-2 text-xs text-slate-500">
          <Gauge size={14} />
          <span>{t("safari.challenge")}</span>
        </div>
      </div>

      <div className="grid h-[calc(100%-3.5rem)] min-h-0 grid-cols-[minmax(0,1.35fr)_320px] gap-0 max-lg:grid-cols-1">
        <div className="flex min-h-0 flex-col overflow-y-auto border-r border-slate-200 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_46%),linear-gradient(180deg,_#ffffff_0%,_#f8fafc_100%)] p-6">
          <div className="mb-5 flex items-start justify-between gap-4 max-sm:flex-col">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                {t("safari.kicker")}
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
                {t("safari.title")}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                {t("safari.subtitle")}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-right shadow-sm backdrop-blur">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{t("safari.timeLeft")}</p>
              <p className="mt-1 text-3xl font-semibold text-slate-950">{timeLeft.toFixed(1)}s</p>
            </div>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div className="rounded-3xl border border-emerald-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">{t("safari.you")}</p>
                  <p className="text-lg font-semibold text-slate-950">{playerWpm} WPM</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  {t("safari.charsProgress", { correct: correctChars, total: targetText.length })}
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-emerald-100">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{ width: `${(correctChars / targetText.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-sky-200 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-sky-700">Lucas</p>
                  <p className="text-lg font-semibold text-slate-950">{LUCAS_WPM} WPM</p>
                </div>
                <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
                  {t("safari.fixedRival")}
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-sky-100">
                <div
                  className="h-full rounded-full bg-sky-500 transition-all"
                  style={{ width: `${(lucasChars / targetText.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3 max-sm:flex-col max-sm:items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{t("safari.roundText")}</p>
                <p className="mt-1 text-sm text-slate-600">{t("safari.roundHint")}</p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => resetRace()}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <RotateCcw size={14} />
                  {t("safari.reset")}
                </button>
                <button
                  type="button"
                  onClick={nextRace}
                  disabled={isFetchingText}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-80"
                >
                  {isFetchingText && <Loader2 size={14} className="animate-spin" />}
                  {isFetchingText
                    ? t("safari.loadingText", { defaultValue: "Loading..." })
                    : t("safari.newText")}
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-950 p-5 text-[15px] leading-8 text-slate-100">
              {targetText.split("").map((char, index) => {
                const typedChar = typedText[index];
                let className = "text-slate-500";

                if (typedChar) {
                  className = typedChar === char
                    ? "bg-emerald-500/18 text-emerald-300"
                    : "bg-rose-500/18 text-rose-300";
                } else if (index === typedText.length) {
                  className = "rounded bg-white/12 text-white";
                }

                return (
                  <span key={`${char}-${index}`} className={`${className} rounded px-[1px] transition-colors`}>
                    {char}
                  </span>
                );
              })}
            </div>

            <textarea
              ref={inputRef}
              value={typedText}
              onChange={(event) => handleChange(event.target.value)}
              onPaste={handlePaste}
              onDrop={handleDrop}
              onKeyDown={handleInputKeyDown}
              disabled={winner !== null}
              spellCheck={false}
              className="mt-4 h-32 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:opacity-70"
              placeholder={t("safari.placeholder")}
            />
            {pasteBlocked && (
              <p className="mt-2 text-xs font-medium text-rose-600">
                {t("safari.noPaste", { defaultValue: "Paste is disabled in this challenge." })}
              </p>
            )}
          </div>
        </div>

        <aside className="flex min-h-0 flex-col gap-4 overflow-y-auto bg-white p-5">
          <div className="rounded-3xl border border-amber-200 bg-[linear-gradient(180deg,_#fff7ed_0%,_#ffffff_100%)] p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <Trophy size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-amber-700">{t("safari.result.title")}</p>
                <p className="text-lg font-semibold text-slate-950">{renderResult()}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{t("safari.stats")}</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-xs text-slate-500">{t("safari.accuracy")}</p>
                <p className="mt-1 text-2xl font-semibold text-slate-950">{accuracy}%</p>
              </div>
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-xs text-slate-500">{t("safari.characters")}</p>
                <p className="mt-1 text-2xl font-semibold text-slate-950">{typedChars}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{t("safari.howItWorks")}</p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
              <p>{t("safari.steps.1")}</p>
              <p>{t("safari.steps.2", { wpm: LUCAS_WPM })}</p>
              <p>{t("safari.steps.3")}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-950 p-5 text-slate-200 shadow-sm">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{t("safari.goal.title")}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{LUCAS_WPM + 1} WPM</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {t("safari.goal.description")}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}