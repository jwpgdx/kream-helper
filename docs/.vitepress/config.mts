import { defineConfig, type HeadConfig } from 'vitepress'

const siteOrigin = 'https://jwpgdx.github.io'
const siteBase = '/kream-helper/'
const siteUrl = `${siteOrigin}${siteBase}`
const releaseUrl = 'https://github.com/jwpgdx/kream-helper/releases'
const downloadUrl = `${releaseUrl}/latest/download/KREAM-Helper-0.1.3-Setup.exe`
const homeTitle = 'KREAM Helper | 크림 보관판매 감지·자동 신청 도우미'
const homeDescription =
  'KREAM(크림) 보관판매 신청 가능 상태를 여러 상품에서 감지하고, 원하는 상품의 신청 절차를 돕는 무료 Windows 프로그램입니다.'
const defaultDescription = 'KREAM Helper 공식 사용 설명서와 Windows 다운로드'
const socialImageUrl = `${siteUrl}images/kream-helper-og.png`
const screenshotUrl = `${siteUrl}images/monitor-overview.png`
const softwareJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'KREAM Helper',
  description: homeDescription,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Windows 10, Windows 11',
  softwareRequirements: '64비트 Windows 10 또는 Windows 11, Microsoft Edge',
  softwareVersion: '0.1.3',
  isAccessibleForFree: true,
  inLanguage: 'ko-KR',
  url: siteUrl,
  image: socialImageUrl,
  screenshot: screenshotUrl,
  downloadUrl,
  installUrl: downloadUrl,
  releaseNotes: `${siteUrl}changelog`,
  datePublished: '2026-07-16T19:04:27Z',
  sameAs: 'https://github.com/jwpgdx/kream-helper',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'KRW',
    availability: 'https://schema.org/InStock',
    url: downloadUrl
  },
  author: {
    '@type': 'Person',
    name: 'jwpgdx',
    url: 'https://github.com/jwpgdx'
  }
})

function canonicalUrl(relativePath: string): string {
  const route = relativePath
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, '')
    .replace(/^\//, '')
  return new URL(`${siteBase}${route}`, siteOrigin).href
}

export default defineConfig({
  lang: 'ko-KR',
  title: 'KREAM Helper',
  description: 'KREAM 보관판매 신청 가능 상태를 확인하고 신청 절차를 돕는 Windows 프로그램 사용 설명서',
  base: siteBase,
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: `${siteOrigin}${siteBase}`
  },
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'color-scheme', content: 'light' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large' }],
    ['meta', { property: 'og:site_name', content: 'KREAM Helper' }],
    ['meta', { property: 'og:locale', content: 'ko_KR' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${siteBase}favicon-32.png` }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: `${siteBase}apple-touch-icon.png` }]
  ],
  transformHead({ pageData }): HeadConfig[] {
    const isHome = pageData.relativePath === 'index.md'
    const title = isHome
      ? homeTitle
      : pageData.title
        ? `${pageData.title} | KREAM Helper`
        : 'KREAM Helper'
    const description = pageData.description || defaultDescription
    const canonical = canonicalUrl(pageData.relativePath)
    const head: HeadConfig[] = [
      ['link', { rel: 'canonical', href: canonical }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:url', content: canonical }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:image', content: socialImageUrl }],
      ['meta', { property: 'og:image:type', content: 'image/png' }],
      ['meta', { property: 'og:image:width', content: '1200' }],
      ['meta', { property: 'og:image:height', content: '630' }],
      [
        'meta',
        {
          property: 'og:image:alt',
          content: 'KREAM Helper에서 여러 보관판매 상품을 감지하는 Windows 앱 화면'
        }
      ],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['meta', { name: 'twitter:image', content: socialImageUrl }],
      [
        'meta',
        {
          name: 'twitter:image:alt',
          content: 'KREAM Helper에서 여러 보관판매 상품을 감지하는 Windows 앱 화면'
        }
      ]
    ]

    if (isHome) {
      head.push(['script', { type: 'application/ld+json' }, softwareJsonLd])
    }

    return head
  },
  themeConfig: {
    logo: '/logo-64.png',
    siteTitle: 'KREAM Helper',
    appearance: false,
    nav: [
      { text: '사용 안내', link: '/guide/' },
      { text: '문제 해결', link: '/troubleshooting' },
      { text: '변경 내역', link: '/changelog' },
      { text: '다운로드', link: releaseUrl }
    ],
    sidebar: [
      {
        text: '시작하기',
        items: [
          { text: '빠른 시작', link: '/guide/' },
          { text: '설치하기', link: '/guide/install' },
          { text: 'KREAM 로그인', link: '/guide/login' }
        ]
      },
      {
        text: '사용 안내',
        items: [
          { text: '감지 상품 추가', link: '/guide/add-product' },
          { text: '감지 시작과 상태', link: '/guide/monitor' },
          { text: '자동 신청', link: '/guide/automatic-submission' },
          { text: '감지 기록', link: '/guide/activity' }
        ]
      },
      {
        text: '관리',
        items: [
          { text: '데이터와 삭제', link: '/guide/data-removal' },
          { text: '문제 해결', link: '/troubleshooting' },
          { text: '변경 내역', link: '/changelog' }
        ]
      },
      {
        text: '정책',
        items: [
          { text: '이용약관', link: '/terms' },
          { text: '개인정보 처리방침', link: '/privacy' }
        ]
      }
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '문서 검색',
            buttonAriaLabel: '문서 검색'
          },
          modal: {
            noResultsText: '검색 결과가 없습니다.',
            resetButtonTitle: '검색 초기화',
            footer: {
              selectText: '선택',
              navigateText: '이동',
              closeText: '닫기'
            }
          }
        }
      }
    },
    outline: {
      level: [2, 3],
      label: '이 페이지에서'
    },
    docFooter: {
      prev: '이전 문서',
      next: '다음 문서'
    },
    notFound: {
      title: '페이지를 찾을 수 없습니다',
      quote: '주소가 변경되었거나 존재하지 않는 문서입니다.',
      linkLabel: '홈으로 이동',
      linkText: '홈으로 이동'
    },
    lastUpdated: {
      text: '마지막 수정'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/jwpgdx' }],
    footer: {
      message: 'KREAM Helper는 크림 주식회사가 제작하거나 공식 승인한 프로그램이 아닙니다.',
      copyright: '문의 · GitHub @jwpgdx'
    }
  }
})
