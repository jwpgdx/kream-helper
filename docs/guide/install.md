---
title: 설치하기
description: KREAM Helper Windows 설치 파일과 체크섬을 확인하고 설치하는 방법입니다.
---

# 설치하기

KREAM Helper는 Windows 10/11 64비트 환경을 기준으로 배포합니다. Microsoft Edge가 필요하며 별도의 Chrome 설치는 필요하지 않습니다.

## 다운로드 파일 확인

최신 Release에서 아래 두 파일을 함께 받습니다.

- `KREAM-Helper-0.1.3-Setup.exe`
- `KREAM-Helper-0.1.3-Setup.exe.sha256`

PowerShell에서 다음 명령으로 설치 파일의 체크섬을 확인할 수 있습니다.

```powershell
Get-FileHash .\KREAM-Helper-0.1.3-Setup.exe -Algorithm SHA256
```

출력값이 Release에 첨부된 `.sha256` 파일과 같아야 합니다.

## 설치 순서

1. 설치 파일을 실행합니다.
2. 사용자 계정 컨트롤 창이 나타나면 게시자와 파일 이름을 확인합니다.
3. 이용약관과 개인정보 안내를 읽고 동의합니다.
4. 설치 위치를 확인하고 설치를 진행합니다.
5. 완료 화면에서 KREAM Helper를 실행합니다.

설치 프로그램은 모든 Windows 사용자가 이용할 수 있도록 관리자 권한으로 설치됩니다. 앱의 로그인 세션과 감지 데이터는 각 Windows 사용자 계정에 따로 저장됩니다.

## 업데이트

새 버전이 준비되면 앱이 업데이트를 내려받습니다. `업데이트 설치`를 선택하면 실행 중인 감지를 확인한 뒤 관리자 권한으로 교체하고 앱을 다시 실행합니다.

<GuideImage
  src="/images/settings.png"
  alt="창 닫기, 시작 프로그램, Windows 알림과 업데이트 확인 항목이 표시된 설정 화면"
  caption="오른쪽 위 설정에서 실행 방식과 알림을 바꾸고 새 버전을 확인할 수 있습니다."
/>

::: info 로컬 데이터 유지
업데이트와 재설치 과정에서는 KREAM 로그인 세션, 감지 대상과 기록이 유지됩니다. 완전히 지우는 방법은 [데이터와 삭제](/guide/data-removal)에서 확인할 수 있습니다.
:::
