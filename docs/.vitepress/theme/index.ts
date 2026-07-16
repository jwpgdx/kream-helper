import DefaultTheme from 'vitepress/theme'
import HomePage from './components/HomePage.vue'
import GuideImage from './components/GuideImage.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('HomePage', HomePage)
    app.component('GuideImage', GuideImage)
  }
}
