# KREAM Helper 웹 GPT 인수인계

- 작성 기준일: 2026-10-05 (Asia/Seoul)
- 제품 기준 버전: `0.1.4`
- 공개 문서 기준 커밋: `5040ab1b589e6a4574e7b3a6eef52f24edca3ba8`
- 인수인계 문서 브랜치: `docs/web-gpt-handoff-2026-10-05`
- 중요: 이 문서는 제품 변경을 시작하기 위한 지시서가 아니라, 현재 상태를 보존한 채 이어받기 위한 현황 기록이다.

## 1. 한눈에 보는 현재 상태

1. Windows용 Electron 앱 `KREAM Helper 0.1.4` 설치 파일은 GitHub Release에 공개되어 있다.
2. GitHub Pages 홈페이지는 `5040ab1`에서 정상 배포되었다.
3. Electron 앱 소스가 있는 `D:\git\kream2` 루트는 Git 저장소가 아니다. `.git`은 비어 있는 디렉터리이며 커밋 이력과 기준 diff가 없다.
4. 실제 Git 저장소는 `D:\git\kream2\website`뿐이며, 이 저장소는 공개 문서와 Release 배포용이다. README에도 앱 소스가 포함되지 않는다고 명시되어 있다.
5. 공개 GitHub Release는 `0.1.4`지만 Cloudflare D1과 R2 자동 업데이트 채널은 아직 `0.1.2`다. 따라서 GitHub에서 직접 받은 설치 파일은 `0.1.4`지만, 앱의 자동 업데이트 채널은 `0.1.4`를 배포하지 않는다.
6. 현재 실행 중인 KREAM Helper, Electron 개발 서버, VitePress 서버 또는 패키징 작업은 없다.
7. `website`의 유일한 미커밋 항목은 티스토리 글 작성 자료 두 파일이며, 그대로 보존해야 한다.
8. GitHub 저장소용 custom Social preview 업로드는 완료되지 않았다. 홈페이지 자체 OG 이미지는 배포되어 있다.

## 2. 프로젝트 목적

KREAM 보관판매 신청 가능 여부를 반복 확인해야 하는 사용자를 위한 Windows 데스크톱 도구다.

- 사용자가 고른 여러 상품을 등록한다.
- 상품별 KREAM 보관판매 신청 가능 상태를 반복 확인한다.
- 자동 신청이 꺼져 있으면 신청 가능 상태를 알리고 KREAM 신청 화면을 연다.
- 자동 신청이 켜져 있으면 사용자가 미리 지정한 상품, 사이즈와 수량으로 필수 동의 및 보증금 결제를 포함한 신청을 한 번 수행한다.
- KREAM 계정 비밀번호, 세션, 감지 대상과 기록은 제작자 서버로 보내지 않고 사용자 컴퓨터에 저장하는 것이 현재 정책이다.

공식 KREAM 프로그램이 아니며, KREAM의 허용이나 계정 안전을 보장하지 않는다.

## 3. 확정 요구사항과 사용자 결정

### 현재 확정된 결정

- 앱 이름: `KREAM Helper`
- 초기 지원 운영체제: Windows 10/11 64비트만
- 앱 기술: Electron + Vue 3 + TypeScript
- KREAM 로그인과 자동화 브라우저: 앱이 실행하는 전용 Microsoft Edge persistent profile
- 별도 Chrome 설치: 필요 없음
- 접근 방식: 하이브리드
  - 로그인과 신청 절차는 실제 KREAM 웹 화면을 이용한다.
  - 상품 검색은 Edge 페이지에서 KREAM 검색 응답을 관찰해 앱 UI에 표시한다.
  - CAPTCHA, 접근 제한, 인증이나 기술적 보호조치는 우회하지 않는다.
- 다중 상품을 동시에 감지 대상으로 유지하되, 실제 KREAM 확인 작업은 직렬화한다.
- 상품별 감지 주기: 최소 60초, 최대 3,600초
- 오류 시 기본 주기보다 길게 대기하며 현재 구현은 최소 120초 backoff를 적용한다.
- 신청 수량: 상품 옵션이 허용하는 범위 안에서 최대 1,000개
- 예상 보증금: 현재 계산 기준 수량 1개당 3,000원. 실제 KREAM 결제 화면이 우선한다.
- 자동 신청: 기본 꺼짐, 상품별 명시적 선택 및 시작 전 확인 필요
- 자동 신청이 꺼진 상품이 신청 가능해지면 `신청 화면 열기` 제공
- 로그인 상태: 앱 시작 시 확인하고 이후 30분 주기로 필요 시 자동 확인
- 감지 대상, 감지 기록, Edge profile과 앱 설정은 로컬 저장
- 무료 및 무제한 감지
- 현재 버전에는 광고, 쇼핑몰 리디렉션, 제휴 쿠키 삽입, 영상 광고와 제휴 프로그램 묶음 설치가 없음
- 설치 방식: NSIS 설치 마법사, 모든 사용자용(`perMachine`), 관리자 권한 필요
- 공개 배포: GitHub Pages + GitHub Releases
- Microsoft Store에는 올리지 않음

### 변경되거나 취소·보류된 결정

- 초기에는 TabService류 제휴 리디렉션, 제휴 프로그램 동시 설치, 영상 광고와 3시간 이용권 모델을 검토했다.
- 이후 현재 버전은 광고와 제휴 수익화를 모두 빼고 무료·무제한으로 배포하기로 변경했다.
- 몰래 쇼핑몰 접속을 가로채거나 사용자의 명시적 클릭 없이 제휴 ID/쿠키를 삽입하는 방식은 현재 약관에서 명시적으로 금지한다.
- 후원 기능은 제거하기로 했다.
- Pro/라이선스 모델은 나중으로 미뤘고 구현하지 않았다.
- macOS 패키징은 가능성만 검토했고 초기 배포에서는 제외했다.
- KREAM을 Electron 내부 창에 완전히 삽입하는 방식은 호환성과 로딩 문제 때문에 포기하고 외부 Edge 창 방식으로 확정했다.
- `KREAM Storage Helper`, `KREAM 보관판매 도우미` 등의 이름을 거쳐 최종적으로 `KREAM Helper`를 사용한다.
- Supabase는 사용하지 않았다. 가벼운 원격 설정과 업데이트 메타데이터는 Cloudflare Workers + KV + D1 + R2로 구성했다.
- 티스토리는 검색 유입용 보조 글로 검토했지만 게시 완료 기록은 없다. 공식 설명과 다운로드 기준은 GitHub Pages/Release다.

## 4. 실제 구현된 기능과 근거 경로

### Electron 메인 프로세스

- 앱 이름, 전용 user-data 경로, 트레이, IPC, 창 생명주기: `D:\git\kream2\src\main\index.ts`
- 전용 Edge profile, 로그인 확인, 상품 검색 응답 파싱, 신청/동의/취소 화면 제어: `D:\git\kream2\src\main\kream-browser.ts`
- 상품별 감지 상태, backoff, 자동 신청 1회 수행 및 결과 불명확 시 중지: `D:\git\kream2\src\main\kream-monitor.ts`
- 여러 상품 상태 관리와 KREAM 확인 직렬화: `D:\git\kream2\src\main\kream-monitor-manager.ts`
- 감지 기록 최대 300건 저장과 동일 제한/오류 집계: `D:\git\kream2\src\main\kream-monitor-activity.ts`
- 창 닫기, 시작 프로그램, 알림 설정 저장: `D:\git\kream2\src\main\app-settings.ts`
- 원격 설정 조회: `D:\git\kream2\src\main\remote-config-client.ts`
- Windows 자동 업데이트: `D:\git\kream2\src\main\app-updater.ts`

### Renderer/UI

- 앱 shell, 로그인 프로필, 30분 로그인 확인, 설정 dialog와 page routing: `D:\git\kream2\src\renderer\src\App.vue`
- 감지 대상 저장 형식, 중복 방지, 수량과 주기 검증: `D:\git\kream2\src\renderer\src\monitor-targets.ts`
- 다중 상품 목록, 전체/개별 시작·중지, 수정·삭제와 신청 화면 열기: `D:\git\kream2\src\renderer\src\components\MonitorPanel.vue`
- 상품 검색, 이미지, 사이즈, 수량, 주기와 자동 신청 설정: `D:\git\kream2\src\renderer\src\components\MonitorProductWizard.vue`
- 감지 기록 목록, 검색, 필터와 삭제: `D:\git\kream2\src\renderer\src\components\MonitorActivity.vue`
- 수량별 보증금 계산: `D:\git\kream2\src\shared\kream-stock-application.ts`
- KREAM 상품 검색 타입: `D:\git\kream2\src\shared\kream-stock-catalog.ts`
- 원격 설정 정규화와 HTTPS update URL 제한: `D:\git\kream2\src\shared\remote-app-config.ts`

### 설치, 브랜딩과 배포 자산

- Electron Builder/NSIS 설정: `D:\git\kream2\electron-builder.yml`
- 설치 약관 원문: `D:\git\kream2\build\license_ko.txt`
- 앱 아이콘/트레이/설치 sidebar: `D:\git\kream2\resources`, `D:\git\kream2\build`
- 자산 생성 스크립트: `D:\git\kream2\scripts\generate-brand-assets.mjs`
- 최종 브랜드 원본/파생본: `D:\git\kream2\artifacts\branding\final`
- UI 자동 검수용 Playwright Electron 명령: `D:\git\kream2\scripts\electron-control.mjs`
  - `docs-mock-catalog`은 문서용 검색 화면 캡처를 위한 프로세스 내부 fixture다.
  - 제품 코드가 아니며 실제 KREAM 검색 검증 근거로 사용하면 안 된다.

### Cloudflare backend

- Worker endpoint와 KV/D1 merge: `D:\git\kream2\worker\src\index.ts`
- 바인딩 설정: `D:\git\kream2\worker\wrangler.jsonc`
- 로컬 seed 예시: `D:\git\kream2\worker\fixtures\app-config.json`
- D1 migration: `D:\git\kream2\worker\migrations\0001_app_releases.sql`
- 운영/배포 체크리스트: `D:\git\kream2\docs\CLOUDFLARE_BACKEND.md`

### 공개 홈페이지와 문서

- 실제 Git 저장소: `D:\git\kream2\website`
- VitePress 설정/SEO/JSON-LD: `website/docs/.vitepress/config.mts`
- 홈페이지 hero와 다운로드 CTA: `website/docs/.vitepress/theme/components/HomePage.vue`
- 홈페이지 스타일: `website/docs/.vitepress/theme/custom.css`
- 설치, 로그인, 상품 추가, 감지, 자동 신청, 기록, 데이터 삭제 안내: `website/docs/guide`
- 공개 약관/개인정보: `website/docs/terms.md`, `website/docs/privacy.md`
- 변경 내역: `website/docs/changelog.md`
- Pages workflow: `website/.github/workflows/deploy-pages.yml`

## 5. 상태 분류

### 완료

- Windows 앱 주요 기능 구현
- 다중 감지, 감지 기록, 자동 신청 opt-in과 보증금 경고 UI
- 전용 Edge 로그인 profile과 자동 로그인 상태 확인
- 트레이, 설정, Windows 알림과 시작 프로그램 옵션
- Cloudflare Worker/KV/D1/R2 기반 원격 설정 및 자동 업데이트 구조 구현
- 새 `KREAM Helper` 브랜딩과 앱/트레이/설치 아이콘 적용
- 공개 홈페이지, 사용 설명서, 약관, 개인정보 처리방침 배포
- GitHub Release `v0.1.4` 공개
- GitHub Pages `0.1.4` 홈페이지 배포

### 진행 중

- 현재 실제 실행 중인 개발/배포 작업은 없다.
- GitHub repository custom Social preview 적용은 중단된 상태다. 2026-08-12 당시 GitHub 웹 로그인이 없어 설정 화면 접근이 실패했다.

### 미완료

- R2 자동 업데이트 feed에 `0.1.4` 설치 파일, blockmap, `latest.yml` 게시
- D1 active Windows release를 `0.1.4`로 전환
- Cloudflare 원격 설정과 자동 업데이트 end-to-end `0.1.4` 검증
- Electron 앱 소스의 정식 Git 저장소/백업 전략 결정 및 커밋
- `0.1.4` 설치 파일을 이용한 새 PC/깨끗한 환경의 실제 설치·제거 검증
- Authenticode 코드 서명
- GitHub repository custom Social preview 업로드
- 티스토리 글 자료를 `0.1.4` 기준으로 갱신하고 실제 게시

### 미확인 또는 오래된 확인

- 2026-10-05 현재 KREAM의 실제 DOM, 비공개 응답 형식과 신청 절차가 여전히 코드와 호환되는지
- 현재 계정으로 로그인, 실제 상품 검색, 감지, 자동 신청과 취소가 정상인지
- KREAM이 이 프로그램의 공개 배포/사용을 허용하는지. 공식 승인이나 제휴 기록은 없다.
- 현재 KREAM 약관/공지 링크와 내용이 공개 문서 작성 당시와 같은지
- Windows SmartScreen 경고와 사용자 설치 경험
- macOS 동작과 패키징
- GitHub repository custom Social preview의 실제 적용 여부
- Slack의 과거 논의나 승인 기록. 현재 환경에는 Slack connector가 없고 저장소에서도 Slack 기록을 찾지 못했다.

## 6. 저장소와 미커밋 상태

### 앱 루트 `D:\git\kream2`

- `.git` 디렉터리는 존재하지만 내부 항목 수가 0이다.
- `git status`와 `git rev-parse`는 `not a git repository`로 실패한다.
- 따라서 현재 branch, HEAD, 원격, tracked/untracked diff를 정의할 수 없다.
- 앱 소스, Worker, 빌드 설정, 배포 자산과 `dist`는 로컬에만 있는 작업본이다.
- 어떤 파일이 기준 버전 이후 수정되었는지 Git으로 증명할 수 없으므로 임의로 초기화·커밋·정리하지 말아야 한다.

### 문서 저장소 `D:\git\kream2\website`

- 현재 branch: `main`
- HEAD: `5040ab1b589e6a4574e7b3a6eef52f24edca3ba8`
- 원격: `origin https://github.com/jwpgdx/kream-helper.git`
- `origin/main...HEAD`: `0 0`, 즉 앞섬/뒤처짐 없음
- 미커밋 파일:
  - `website/content/claude-tistory-prompt.md`
  - `website/content/tistory-article-source.md`
- 두 파일은 티스토리 소개 글 작성 자료다. `tistory-article-source.md`에는 아직 기준 버전이 `0.1.3`으로 적혀 있다.
- 두 파일을 이번 인수인계 브랜치나 `main`에 포함하지 않았다. 삭제·수정·커밋하지 말고 그대로 보존한다.
- 공개 저장소에는 앱 소스가 없고 GitHub Pages 문서만 있다.

### 인수인계 문서 기록 방식

- Pages workflow는 `main` push와 수동 실행만 처리한다.
- PR event와 다른 branch push는 자동 배포하지 않는다.
- 그래서 이 문서는 `docs/web-gpt-handoff-2026-10-05` branch에만 기록하며 `main`에 merge하거나 PR을 만들지 않는다.

## 7. 실행 중인 작업과 안전한 이어받기

### 현재 실행 상태

- `KREAM Helper.exe`: 실행 중 아님
- Electron dev/preview: 실행 중 아님
- VitePress dev server: 실행 중 아님
- electron-builder/테스트/린트: 실행 중 아님
- GitHub Actions: 대기 또는 실행 중인 배포 없음. 최신 Pages run은 성공 완료 상태다.
- 보이는 Node/PowerShell 프로세스는 Codex 앱과 도구 host이며 프로젝트 서버가 아니다.

### 안전한 시작 순서

1. 먼저 이 문서와 `D:\git\kream2\README.md`, `website/README.md`를 읽는다.
2. `git -C D:\git\kream2\website status -sb`만 실행해 문서 저장소 상태를 재확인한다.
3. 앱 루트에서 `git init`, `git clean`, `git reset`, 대량 포맷 또는 의존성 업데이트를 실행하지 않는다.
4. `website/content` 두 파일은 사용자가 별도로 결정하기 전까지 건드리지 않는다.
5. 앱을 실행해야 한다면 먼저 설치본과 개발본 user-data가 분리되어 있음을 확인한다.
   - 개발판: `%APPDATA%\kream-helper-dev`
   - 패키지판: `%APPDATA%\kream-helper`
6. 실제 KREAM 계정이나 결제 결과에 영향을 주는 감지 시작, 자동 신청, 취소 테스트는 사용자에게 그 시점의 별도 승인을 받고 진행한다.
7. Cloudflare D1/KV/R2 변경은 현재 배포 상태를 읽고 백업·롤백 계획을 세운 뒤 별도 승인을 받아 실행한다.
8. `website/main` push는 즉시 Pages 자동 배포를 일으키므로 문서 초안은 별도 branch에서만 작업한다.

## 8. 검증 이력

### 2026-08-12까지 완료된 검증

- 앱 `npm run build`: 성공
- TypeScript/Vue/Worker typecheck: 성공
- Vitest: 10개 test file, 30개 test 통과
- 소스 범위 ESLint: 성공
- VitePress production build: 성공
- Windows NSIS package 생성: 성공
- `dist/KREAM-Helper-0.1.4-Setup.exe`
  - 파일 버전 `0.1.4`
  - 크기 `97,691,169` bytes
  - SHA-256 `70067C9D108F83B99B1AB481CF5F0DD489403DD2B76B82676CDAC273972757B7`
- `win-unpacked` 실행 파일을 실행해 UI와 새 앱 브랜딩을 확인
- 앱/설치 실행 파일에서 새 아이콘을 추출해 확인
- 문서용 주요 화면 여섯 장을 새 브랜딩으로 다시 캡처
- 홈페이지 1440px desktop/390px mobile 검수
  - 가로 overflow 없음
  - hero object 12개 로드 및 desktop 겹침 없음
  - 다운로드 링크와 `0.1.4` 표기 확인
  - console warning/error 없음
- GitHub Pages run `31530741678`: 성공
- GitHub Release의 설치 파일 digest가 로컬 설치 파일 SHA-256과 일치

### 검증 해석 시 주의

- 상품 검색과 설정 문서 이미지는 `electron-control.mjs`의 `docs-mock-catalog` fixture로 촬영했다. 이것은 UI 검증이며 2026-10-05 현재 실제 KREAM API 호환성 검증이 아니다.
- 최종 `0.1.4` 사이클에서는 `win-unpacked` 앱을 실행했지만 `0.1.4` NSIS 설치 파일을 실제로 재설치해 설치/제거를 끝까지 검증한 기록은 없다.
- 이전 개발 과정에서 실제 KREAM 로그인, 검색, 감지, 신청과 취소를 시험했지만 2026-10-05 기준 회귀 검증으로 간주하면 안 된다.
- 설치 파일과 실행 파일은 모두 Authenticode `NotSigned`다. electron-builder log의 `signtool` 문구를 상용 코드 서명으로 해석하면 안 된다.

## 9. 실제 배포와 로컬/GitHub 코드 차이

| 항목 | 실제 상태 |
|---|---|
| GitHub Pages | `0.1.4`, commit `5040ab1`, 정상 응답 |
| GitHub Release | `v0.1.4`, tag가 `5040ab1`을 가리킴 |
| Release 설치 파일 | 로컬 `dist`와 SHA-256 일치 |
| Electron 앱 소스 | 로컬 루트에만 존재, GitHub tag/commit에 포함되지 않음 |
| Cloudflare Worker health | 2026-10-05 확인 시 200, KV/D1 모두 `ok` |
| Cloudflare app-config | `latest: 0.1.2`, `minimum: 0.1.0`, 자동 업데이트 true |
| R2 stable feed | `0.1.2`, 파일명도 이전 `KREAM-Storage-Helper-0.1.2-Setup.exe` |
| 로컬 Worker fixture | `latest: 0.1.4`, 실제 운영 KV/D1과 불일치 |
| 문서 저장소 미커밋 자료 | 티스토리 자료가 아직 `0.1.3` 기준이며 미배포 |
| 코드 서명 | 없음 (`NotSigned`) |

영향:

- 신규 사용자는 GitHub에서 `0.1.4`를 직접 받을 수 있다.
- 기존 자동 업데이트 사용자는 R2/D1이 `0.1.2`이므로 `0.1.4`를 자동으로 받지 못한다.
- GitHub `v0.1.4` tag만으로 해당 installer를 재현할 수 없다. tag에는 홈페이지 문서만 있고 앱 소스가 없기 때문이다.
- packaged `0.1.4`는 원격에서 `latest: 0.1.2`를 받지만 downgrade가 금지되어 있어 `0.1.2`로 내려가지는 않는다.

## 10. 승인 범위와 별도 승인이 필요한 작업

### 이미 승인·완료된 범위

- 제품명 `KREAM Helper`
- Windows 공개 배포
- GitHub Pages 공식 홈페이지
- GitHub Release `0.1.4`
- 무료·무제한, 광고/제휴 없음
- 현재 약관과 개인정보 처리방침 공개
- 새 앱/홈페이지 브랜딩

### 별도 승인이 필요한 작업

- 앱 루트의 새 Git 저장소 생성, 공개/비공개 결정, 최초 커밋과 push
- R2에 `0.1.4` update artifact 업로드
- Cloudflare D1 active release/KV 변경
- 실제 KREAM 계정으로 자동 신청, 결제, 취소 또는 부하를 줄 수 있는 테스트
- 코드 서명 인증서 구매/사용
- GitHub repository custom Social preview 업로드 재개
- 티스토리 글 갱신 및 게시
- 광고, 제휴 리디렉션, 영상 광고, 제휴 프로그램 번들 또는 Pro/라이선스 기능 추가
- macOS 지원 또는 Microsoft Store 배포
- KREAM에 공식 허용/제휴 문의

이번 인수인계 요청은 새 기능, backend 변경, live KREAM 동작, main merge를 승인한 것이 아니다.

## 11. 권장 다음 순서

1. **앱 소스 보존 전략 결정**
   - 현재 로컬 소스 전체를 먼저 백업한다.
   - 공개 저장소에 앱 소스를 넣을지, 별도 private repo를 만들지 사용자와 결정한다.
   - 기준이 없는 상태에서 기존 홈페이지 저장소에 앱 소스를 억지로 합치지 않는다.
2. **자동 업데이트 불일치 해결 계획 작성**
   - `0.1.4` installer, blockmap, `latest.yml`을 R2에 올릴 정확한 절차와 롤백을 먼저 정리한다.
   - D1 active release와 KV를 함께 바꿔야 한다.
   - 계획 승인 전에는 운영 데이터를 변경하지 않는다.
3. **현재 KREAM 호환성 회귀 검증**
   - 로그인 → 실제 검색 → 상품 상세/사이즈 → 감지 상태까지만 우선 확인한다.
   - 자동 신청/취소는 별도 승인 후 작은 수량으로 진행한다.
4. **깨끗한 Windows 환경에서 `0.1.4` 설치 검증**
   - 모든 사용자용 설치, 재실행, 제거, user-data 유지/삭제와 SmartScreen을 확인한다.
5. **선택 작업**
   - GitHub custom Social preview
   - 티스토리 자료 `0.1.4` 갱신과 게시
   - 코드 서명

## 12. GitHub 기록과 최신 기준 문서

### GitHub

- 저장소: https://github.com/jwpgdx/kream-helper
- 기준 commit: https://github.com/jwpgdx/kream-helper/commit/5040ab1b589e6a4574e7b3a6eef52f24edca3ba8
- `v0.1.4` Release: https://github.com/jwpgdx/kream-helper/releases/tag/v0.1.4
- 최신 Pages 성공 run: https://github.com/jwpgdx/kream-helper/actions/runs/31530741678
- 공개 홈페이지: https://jwpgdx.github.io/kream-helper/
- 2026-10-05 확인 시 open/closed PR 및 issue 목록은 비어 있었다.

### 공개 기준 문서

- 빠른 시작: https://jwpgdx.github.io/kream-helper/guide/
- 설치: https://jwpgdx.github.io/kream-helper/guide/install
- 로그인: https://jwpgdx.github.io/kream-helper/guide/login
- 상품 추가: https://jwpgdx.github.io/kream-helper/guide/add-product
- 감지: https://jwpgdx.github.io/kream-helper/guide/monitor
- 자동 신청: https://jwpgdx.github.io/kream-helper/guide/automatic-submission
- 감지 기록: https://jwpgdx.github.io/kream-helper/guide/activity
- 데이터 삭제: https://jwpgdx.github.io/kream-helper/guide/data-removal
- 문제 해결: https://jwpgdx.github.io/kream-helper/troubleshooting
- 이용약관: https://jwpgdx.github.io/kream-helper/terms
- 개인정보 처리방침: https://jwpgdx.github.io/kream-helper/privacy
- 변경 내역: https://jwpgdx.github.io/kream-helper/changelog

### 로컬 기준 문서

- 프로젝트 개요: `D:\git\kream2\README.md`
- 설치 약관: `D:\git\kream2\build\license_ko.txt`
- 개인정보 처리방침: `D:\git\kream2\docs\PRIVACY.md`
- Cloudflare 운영 문서: `D:\git\kream2\docs\CLOUDFLARE_BACKEND.md`
- 홈페이지 저장소 설명: `D:\git\kream2\website\README.md`

### Slack

- 현재 실행 환경에는 Slack connector가 없다.
- 로컬 저장소에서 `Slack`, `slack`, `슬랙` 문자열이 포함된 운영 기록을 찾지 못했다.
- 따라서 Slack의 기존 대화, 승인 또는 링크는 확인하지 못했다. 웹 GPT가 Slack 접근 권한을 가진 경우 이 문서를 사실 기준으로 삼고 관련 채널을 별도로 조회해야 한다.

## 13. 사실과 추론 구분

### 직접 확인한 사실

- 위 Git/GitHub/Release/Actions/Cloudflare/R2 상태
- 설치 파일 hash, 크기, version과 서명 상태
- 현재 process 목록에 프로젝트 앱/서버가 없다는 점
- `website/content` 두 파일만 미커밋이라는 점

### 추론 또는 주의

- GitHub 저장소 HTML의 `og:image`가 일반 `opengraph.githubassets.com` URL이고 과거 업로드가 로그인에서 중단되었으므로 repository custom Social preview가 적용되지 않은 것으로 보인다. GitHub 설정 화면에서 최종 확인은 하지 못했다.
- KREAM 웹 구조는 외부 서비스라 7~8월 검증 결과가 10월에도 유지된다고 가정하면 안 된다.
- 약관 문서는 위험 고지와 동의 흐름을 보강한 것이며 KREAM의 허용이나 법률적 면책을 보장하지 않는다.

## 14. 보안 주의

- 이 문서에는 GitHub token, Cloudflare token/account secret, KREAM cookie, 로그인 정보, 결제 정보와 사용자 식별 정보를 넣지 않았다.
- 웹 GPT도 공개 issue, PR, Slack 또는 문서에 위 값을 남기면 안 된다.
- 화면 캡처를 공유하기 전에 계정명, 이메일, 주소, 결제수단과 주문 정보를 반드시 확인한다.
