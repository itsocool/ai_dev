# AI Developer Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive Korean AI developer portfolio landing page that helps recruiters request an interview.

**Architecture:** Use one semantic HTML document and one stylesheet. Native anchors and `mailto:` provide all interaction; no JavaScript or build tooling is needed.

**Tech Stack:** HTML5, CSS3, Python standard-library static server for verification

## Global Constraints

- Match these accepted concept images: `/home/th.kim/.codex/generated_images/01a00565-c99a-7be3-8f1d-5b911beadd98/exec-0b2860d4-a820-4af9-8804-9631c6ed53c0.png`, `/home/th.kim/.codex/generated_images/01a00565-c99a-7be3-8f1d-5b911beadd98/exec-c4868385-844a-4a13-965c-5a8858544820.png`, and `/home/th.kim/.codex/generated_images/01a00565-c99a-7be3-8f1d-5b911beadd98/exec-cef4b9d3-3361-45f9-a26f-54434a2faaf4.png`.
- Use a warm ivory background, deep charcoal typography, and one vivid cobalt-blue accent; do not add gradients, neon, glassmorphism, stock imagery, portraits, cards, pills, badges, or fake client logos.
- Keep all visible UI and portfolio copy code-native and directly editable in `index.html`.
- Use only dependency-free semantic HTML and CSS; do not add a package manager, framework, JavaScript, form backend, icon package, or external raster asset.
- Use the fictional example identity `김도윤`, email `hello@doyoon.dev`, and clearly label all project outcomes as `예시 성과`.
- The page must be usable at desktop and mobile widths with semantic landmarks, visible keyboard focus, sufficient contrast, and reduced-motion-safe CSS.

---

### Task 1: Complete portfolio landing page

**Files:**
- Create: `index.html`
- Create: `styles.css`

**Interfaces:**
- Consumes: the approved design spec and three concept image paths in Global Constraints.
- Produces: a static site served from the repository root; section anchors `#work`, `#about`, and `#contact`; contact link `mailto:hello@doyoon.dev`.

- [ ] **Step 1: Create the semantic page structure and exact example content**

Create `index.html` with:

- a skip link to `#main`
- a header containing `김도윤` and navigation links `Work`, `About`, `Contact`
- a hero with the heading `AI를 실제 제품으로 만드는 개발자`, the approved supporting copy, `면접 제안하기`, `프로젝트 보기`, and `LLM · RAG · MLOps · Product Engineering`
- `#work` with the three approved projects, roles, stacks, descriptions, and `예시 성과` outcomes:
  - `사내 지식 검색을 바꾼 RAG Assistant` / `검색 성공률 34% 향상`
  - `상담 품질을 높인 Conversation Copilot` / `후처리 시간 41% 단축`
  - `모델 운영을 단순화한 Evaluation Pipeline` / `배포 검증 3시간→18분`
- `#about` with `좋은 AI는 모델 밖에서 완성됩니다.`, the approved paragraph, and the three capabilities `Applied AI`, `Product Engineering`, `Collaboration`
- `#contact` with `함께 만들 다음 문제를 이야기해 주세요.`, `AI 제품을 만드는 팀과의 대화를 기다립니다.`, and a mail link to `hello@doyoon.dev`
- a footer containing `김도윤 · AI Product Engineer` and `Seoul · 2026`

Use decorative elements only as `aria-hidden="true"`; include a descriptive `<title>` and meta description.

- [ ] **Step 2: Implement the accepted editorial design system**

Create `styles.css` using these base tokens, adjusting only if direct concept comparison shows a mismatch:

```css
:root {
  --paper: #f5f2eb;
  --ink: #0a0a0a;
  --blue: #1047e8;
  --line: rgba(10, 10, 10, 0.72);
  --gutter: clamp(1.25rem, 5vw, 5rem);
  --section-space: clamp(5rem, 10vw, 10rem);
}
```

Implement:

- a quiet header with a thin bottom rule
- a two-column hero with oversized fluid typography and CSS-only line/rectangle geometry
- large open-layout horizontal project rows with number, summary, role/stack, blue outcome, and restrained geometry; no card containers
- an open three-column capability row
- a full-width cobalt contact band with ivory text
- a minimal ruled footer
- `:focus-visible` treatment using a high-contrast outline
- a mobile breakpoint at `800px` that stacks hero, project details, capabilities, contact content, and footer without horizontal overflow
- `@media (prefers-reduced-motion: reduce)` that removes smooth scrolling and transitions

- [ ] **Step 3: Run structural checks**

Run:

```bash
python3 - <<'PY'
from html.parser import HTMLParser
from pathlib import Path

class Check(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.links = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if "id" in attrs:
            self.ids.add(attrs["id"])
        if tag == "a":
            self.links.append(attrs.get("href", ""))

check = Check()
check.feed(Path("index.html").read_text())
assert {"main", "work", "about", "contact"} <= check.ids
assert {"#work", "#about", "#contact", "mailto:hello@doyoon.dev"} <= set(check.links)
assert "예시 성과" in Path("index.html").read_text()
assert "@media" in Path("styles.css").read_text()
print("structural checks passed")
PY
```

Expected: `structural checks passed`.

- [ ] **Step 4: Verify the browser rendering**

Run `python3 -m http.server 4173`, open `http://127.0.0.1:4173`, and inspect at `1440×1000` and `390×844`. Verify the header anchors, both interview links, absence of horizontal overflow, readable typography, visible keyboard focus, and section-by-section fidelity to all three accepted concepts.

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css
git commit -m "feat: build AI developer portfolio landing page"
```
