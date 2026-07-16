<script setup lang="ts">
import {
  ArrowRight,
  BookOpen,
  Download,
  HardDrive,
  MonitorCheck,
  ShieldCheck
} from '@lucide/vue'
import { withBase } from 'vitepress'

const installerUrl =
  'https://github.com/jwpgdx/kream-helper/releases/latest/download/KREAM-Helper-0.1.3-Setup.exe'
</script>

<template>
  <main class="kh-home">
    <section class="home-intro" aria-labelledby="home-title">
      <p class="home-kicker">Windows용 크림 보관판매 감지 도구</p>
      <h1 id="home-title">KREAM Helper</h1>
      <p class="home-lead">
        여러 상품의 보관판매 신청 가능 상태를 한곳에서 확인하고, 선택한 상품만 감지하거나 자동 신청할 수 있습니다.
      </p>
      <div class="home-actions">
        <a class="action-primary" :href="installerUrl">
          <Download :size="18" aria-hidden="true" />
          Windows용 다운로드
        </a>
        <a class="action-secondary" :href="withBase('/guide/')">
          <BookOpen :size="18" aria-hidden="true" />
          빠른 시작
        </a>
      </div>
      <p class="release-note">v0.1.3 · Windows 10/11 64비트 · 약 96MB</p>
      <figure class="home-product-shot">
        <img
          :src="withBase('/images/monitor-overview.png')"
          :srcset="`${withBase('/images/monitor-overview-640.png')} 640w, ${withBase('/images/monitor-overview.png')} 1164w`"
          sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1128px) calc(100vw - 48px), 1080px"
          alt="KREAM Helper에서 세 상품을 감지 대상으로 등록한 화면"
          width="1164"
          height="721"
          decoding="async"
          fetchpriority="high"
        />
      </figure>
    </section>

    <section class="home-facts" aria-label="핵심 정보">
      <div>
        <MonitorCheck :size="21" aria-hidden="true" />
        <span><strong>여러 상품</strong>을 동시에 관리</span>
      </div>
      <div>
        <ShieldCheck :size="21" aria-hidden="true" />
        <span>자동 신청은 <strong>기본 꺼짐</strong></span>
      </div>
      <div>
        <HardDrive :size="21" aria-hidden="true" />
        <span>로그인과 기록은 <strong>로컬 저장</strong></span>
      </div>
    </section>

    <section class="home-start" aria-labelledby="start-title">
      <header>
        <p>처음 사용하는 경우</p>
        <h2 id="start-title">감지 시작까지 다섯 단계</h2>
      </header>
      <ol class="start-list">
        <li><span>1</span><div><strong>프로그램 설치</strong><small>약관을 확인하고 Windows에 설치합니다.</small></div></li>
        <li><span>2</span><div><strong>KREAM 로그인</strong><small>앱이 연 전용 Edge 창에서 직접 로그인합니다.</small></div></li>
        <li><span>3</span><div><strong>상품 검색</strong><small>상품명 또는 모델번호로 감지 대상을 찾습니다.</small></div></li>
        <li><span>4</span><div><strong>조건 설정</strong><small>사이즈, 수량, 확인 간격과 자동 신청 여부를 정합니다.</small></div></li>
        <li><span>5</span><div><strong>감지 시작</strong><small>상품별 또는 전체 시작 버튼으로 감지를 실행합니다.</small></div></li>
      </ol>
      <a class="guide-link" :href="withBase('/guide/')">
        화면을 보며 시작하기
        <ArrowRight :size="17" aria-hidden="true" />
      </a>
    </section>

    <section class="home-caution" aria-labelledby="caution-title">
      <ShieldCheck :size="23" aria-hidden="true" />
      <div>
        <h2 id="caution-title">사용 전 확인</h2>
        <p>
          KREAM Helper는 비공식 제3자 프로그램입니다. KREAM 정책에 따라 계정 이용이 제한될 수 있으며,
          자동 신청을 켜면 지정한 수량만큼 보증금이 결제될 수 있습니다.
        </p>
      </div>
      <a :href="withBase('/guide/automatic-submission')">자동 신청 안내</a>
    </section>
  </main>
</template>
