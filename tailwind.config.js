module.exports = {
  content: [
    './index.html',
    './checkout.html'
  ],
  theme: {
    screens:{
      'mobile': {'max':'580px'},
      'medium': {'min': '580px','max':'1256px'},
      'all':{'min':'100px','max':'5000px'}
    },
    extend: {
      backgroundImage:{
        'mobile-pattern': "url('../img/mobile-bg.png')",
        'desktop-pattern': "url('../img/desktop-bg.png')",
        'artist-bg': "url('../img/artist-bg3.png')",
        'about-bg':"url('../img/about-bg.png')"
      },
      colors:{
        'hollywood-gold':'#EBD470',
        'light-gold': '#FFF9DD',
        'light-grey': '#E8E8E8',
        'hollywood-gold-secondary': '#CEBC68',
      },
    },
  },
  plugins: [],
  mode: 'jit',
  purge: ['./public/*.html'],
}
