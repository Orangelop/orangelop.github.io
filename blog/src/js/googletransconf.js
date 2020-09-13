function googleTranslateElementInit() {
    new google.translate.TranslateElement({
      pageLanguage: 'en,zh-CN',
      includedLanguages: 'en,zh-CN,hr,cs,da,nl,fr,de,el,iw,hu,ga,it,ja,ko,pt,ro,ru,sr,es,th,vi',
      autoDisplay: false,
      gaTrack: true,
      gaId: 'UA-4334041-9',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
  }