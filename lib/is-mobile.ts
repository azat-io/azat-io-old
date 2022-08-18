export let isMobile = __VUEPRESS_SSR__
  ? true
  : /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
