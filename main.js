// jQueryが読み込まれたことを確認
$(document).ready(function () {
  console.log("jQueryが正常に読み込まれました！");
  console.log("jQueryバージョン:", $.fn.jquery);
  const $mainHeaderMenuBtns = $(".mainHeaderMenuBtns");
  const $homeWrapperInners = $(".homeWrapperInner");
  const $homeSliderTrack = $("#homeSliderTrack");
  const $bottomMenus = $(".bottomMenu");
  const $contentsWrappers = $(".contentsWrapper");
  const $mainHeaderWrapper = $("#mainHeaderWrapper");
  const $bottomMenuWrapper = $("#bottomMenuWrapper");
  const $openToLeftSlide = $(".openToLeftSlide");
  const $openToUpSlide = $(".openToUpSlide");
  const $closeToLeftSlide = $(".closeToLeftSlide");
  const $closeToUpSlide = $(".closeToUpSlide");
  const $toLeftSlide = $("#toLeftSlide");
  const $toUpSlide = $("#toUpSlide");
  const $toLeftSlideInners = $(".toLeftSlideInner");
  const $homeInner = $("#homeInner");
  const $newsHeaderToggles = $(".newsHeaderToggle");
  const $newsHeaderToggleBar = $("#newsHeaderToggleBar");
  const $newsBodyInners = $(".newsBodyInner");
  const $postsBannerViewport = $("#postsBannerViewport");
  const $postsBannerDots = $(".postsBannerDot");
  const $homePostToggleItems = $("#homePostToggle > div");
  const $postLiImages = $(".postLiImages");
  const $postImageModal = $("#postImageModal");
  const $postImageModalViewport = $("#postImageModalViewport");
  const $postImageModalTrack = $("#postImageModalTrack");
  const $postImageModalDots = $("#postImageModalDots");
  const $postImageModalPrev = $("#postImageModalPrev");
  const $postImageModalNext = $("#postImageModalNext");
  const $closePostImageModal = $("#closePostImageModal");
  const $messageInput = $("#messageInput");
  const $messagePostBtn = $("#messagePostBtn");
  let homeSlideIndex = Math.max(0, $mainHeaderMenuBtns.index($mainHeaderMenuBtns.filter(".active")));
  const maxHomeSlideIndex = Math.min($mainHeaderMenuBtns.length, $homeWrapperInners.length) - 1;
  let postImageModalSources = [];
  let postImageModalIndex = 0;
  let postImageModalTouchStartX = 0;
  let postImageModalTouchStartY = 0;

  function setPostsBannerDot(index) {
    if ($postsBannerDots.length === 0) return;

    const nextIndex = Math.max(0, Math.min(index, $postsBannerDots.length - 1));
    $postsBannerDots.removeClass("active");
    $postsBannerDots.eq(nextIndex).addClass("active");
  }

  function setHomeChromeHiddenByScroll(isHidden) {
    $mainHeaderWrapper.toggleClass("scroll-hidden", isHidden);
    $bottomMenuWrapper.toggleClass("scroll-hidden", isHidden);
  }

  function setPostLiImagesLayout() {
    if ($postLiImages.length === 0) return;

    $postLiImages.each(function () {
      const $images = $(this).children(".postLiImageWrap");
      const total = $images.length;

      $(this).removeClass("count-1 count-2 count-3 count-4plus");
      $images.removeClass("hidden-by-count is-more").removeAttr("data-more");

      if (total <= 0) return;
      if (total === 1) {
        $(this).addClass("count-1");
        return;
      }
      if (total === 2) {
        $(this).addClass("count-2");
        return;
      }
      if (total === 3) {
        $(this).addClass("count-3");
        return;
      }

      $(this).addClass("count-4plus");
      if (total > 4) {
        $images.slice(4).addClass("hidden-by-count");
        $images.eq(3).addClass("is-more").attr("data-more", `+${total - 4}`);
      }
    });
  }

  function randomizePostLiImages() {
    const cacheBust = Date.now();

    $(".postLiImage").each(function (index) {
      const randomId = Math.floor(Math.random() * 1000) + 1;
      $(this).attr("src", `https://picsum.photos/id/${randomId}/800/800?cb=${cacheBust}-${index}`);
    });
  }

  function setNewsHeaderToggle(index) {
    if ($newsHeaderToggles.length === 0 || $newsHeaderToggleBar.length === 0) return;

    const nextIndex = Math.max(0, Math.min(index, $newsHeaderToggles.length - 1));
    $newsHeaderToggles.removeClass("active");
    $newsHeaderToggles.eq(nextIndex).addClass("active");
    $newsHeaderToggleBar.css("transform", `translateX(${nextIndex * 100}%)`);

    const targetTitle = $newsHeaderToggles.eq(nextIndex).data("title");
    if (targetTitle && $newsBodyInners.length > 0) {
      $newsBodyInners.removeClass("active");
      $newsBodyInners.filter(`[data-title="${targetTitle}"]`).addClass("active");
    }
  }

  function showToLeftSlideInner(title) {
    $toLeftSlideInners.removeClass("active");
    const $target = $toLeftSlideInners.filter(`[data-title="${title}"]`);
    if ($target.length > 0) {
      $target.addClass("active");
      return;
    }
    $toLeftSlideInners.eq(0).addClass("active");
  }

  function renderPostImageModal() {
    if (postImageModalSources.length === 0) return;

    const nextIndex = Math.max(0, Math.min(postImageModalIndex, postImageModalSources.length - 1));
    postImageModalIndex = nextIndex;
    $postImageModalTrack.css("transform", `translateX(-${nextIndex * 100}%)`);
    $postImageModalDots.empty();

    postImageModalSources.forEach(function (_, index) {
      const dotClass = index === nextIndex ? "postImageModalDot active" : "postImageModalDot";
      $postImageModalDots.append(`<button type="button" class="${dotClass}" data-index="${index}"></button>`);
    });

    $postImageModalPrev.prop("disabled", nextIndex === 0).toggle(nextIndex !== 0);
    $postImageModalNext
      .prop("disabled", nextIndex === postImageModalSources.length - 1)
      .toggle(nextIndex !== postImageModalSources.length - 1);
  }

  function openPostImageModal(sources, startIndex) {
    if (sources.length === 0) return;

    postImageModalSources = sources;
    postImageModalIndex = Math.max(0, Math.min(startIndex, sources.length - 1));
    $postImageModalTrack.empty();
    postImageModalSources.forEach(function (src, index) {
      $postImageModalTrack.append(`
        <div class="postImageModalSlide">
          <img class="postImageModalImage" src="${src}" alt="post image ${index + 1}" />
        </div>
      `);
    });
    renderPostImageModal();
    $postImageModal.addClass("active");
  }

  function closePostImageModal() {
    $postImageModal.removeClass("active");
    $postImageModalTrack.empty();
    $postImageModalTrack.css("transform", "translateX(0%)");
    $postImageModalDots.empty();
    postImageModalSources = [];
    postImageModalIndex = 0;
  }

  function setHomeSlide(index) {
    if (maxHomeSlideIndex < 0) return;

    const nextIndex = Math.max(0, Math.min(index, maxHomeSlideIndex));
    homeSlideIndex = nextIndex;

    $mainHeaderMenuBtns.removeClass("active");
    $mainHeaderMenuBtns.eq(nextIndex).addClass("active");
    $homeWrapperInners.removeClass("active");
    $homeWrapperInners.eq(nextIndex).addClass("active");
    $homeSliderTrack.css("transform", `translateX(-${nextIndex * 100}%)`);
    setHomeChromeHiddenByScroll(false);
  }

  function syncMessagePostBtnActive() {
    if ($messageInput.length === 0 || $messagePostBtn.length === 0) return;
    const hasValue = ($messageInput.val() || "").toString().trim().length > 0;
    $messagePostBtn.toggleClass("active", hasValue);
  }

  if (maxHomeSlideIndex >= 0) {
    setHomeSlide(Math.min(homeSlideIndex, maxHomeSlideIndex));
  }
  setNewsHeaderToggle(Math.max(0, $newsHeaderToggles.index($newsHeaderToggles.filter(".active"))));

  $mainHeaderWrapper.toggleClass("hidden", $bottomMenus.index($bottomMenus.filter(".active")) !== 0);

  $mainHeaderMenuBtns.on("click", function () {
    setHomeSlide($mainHeaderMenuBtns.index(this));
  });

  $bottomMenus.on("click", function () {
    const menuIndex = $bottomMenus.index(this);

    $bottomMenus.removeClass("active");
    $(this).addClass("active");

    $contentsWrappers.removeClass("active");
    $contentsWrappers.eq(menuIndex).addClass("active");
    $mainHeaderWrapper.toggleClass("hidden", menuIndex !== 0);
    setHomeChromeHiddenByScroll(false);
  });

  $openToLeftSlide.on("click", function () {
    const targetTitle = $(this).data("title") || $(this).attr("datat-title");

    if (targetTitle) {
      showToLeftSlideInner(targetTitle);
    }

    $toLeftSlide.addClass("active");
    $homeInner.addClass("slideLeft");
  });

  $openToUpSlide.on("click", function () {
    $toUpSlide.addClass("active");
  });

  $closeToLeftSlide.on("click", function () {
    $toLeftSlide.removeClass("active");
    $homeInner.removeClass("slideLeft");
  });

  $closeToUpSlide.on("click", function () {
    $toUpSlide.removeClass("active");
  });

  $newsHeaderToggles.on("click", function () {
    setNewsHeaderToggle($newsHeaderToggles.index(this));
  });

  $homePostToggleItems.on("click", function () {
    $homePostToggleItems.removeClass("active");
    $(this).addClass("active");
  });

  $messageInput.on("input", function () {
    syncMessagePostBtnActive();
  });

  $(document).on("click", ".postLiImage", function (event) {
    event.stopPropagation();
    const $imagesInPost = $(this).closest(".postLi").find(".postLiImage");
    const imageSources = $imagesInPost
      .map(function () {
        return $(this).attr("src");
      })
      .get()
      .filter(Boolean);

    openPostImageModal(imageSources, $imagesInPost.index(this));
  });

  $(document).on("click", ".postLi", function () {
    const targetTitle = $(this).data("title") || "single";
    showToLeftSlideInner(targetTitle);
    $toLeftSlide.addClass("active");
    $homeInner.addClass("slideLeft");
  });

  $closePostImageModal.on("click", function () {
    closePostImageModal();
  });

  $postImageModal.on("click", function (event) {
    if (event.target !== this) return;
    closePostImageModal();
  });

  $postImageModalPrev.on("click", function () {
    if (postImageModalIndex <= 0) return;
    postImageModalIndex -= 1;
    renderPostImageModal();
  });

  $postImageModalNext.on("click", function () {
    if (postImageModalIndex >= postImageModalSources.length - 1) return;
    postImageModalIndex += 1;
    renderPostImageModal();
  });

  $postImageModalDots.on("click", ".postImageModalDot", function () {
    postImageModalIndex = Number($(this).data("index")) || 0;
    renderPostImageModal();
  });

  $postImageModalViewport.on("touchstart", function (event) {
    const touch = event.originalEvent.changedTouches[0];
    postImageModalTouchStartX = touch.clientX;
    postImageModalTouchStartY = touch.clientY;
  });

  $postImageModalViewport.on("touchend", function (event) {
    const touch = event.originalEvent.changedTouches[0];
    const deltaX = touch.clientX - postImageModalTouchStartX;
    const deltaY = touch.clientY - postImageModalTouchStartY;

    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    if (deltaX < 0) {
      if (postImageModalIndex >= postImageModalSources.length - 1) return;
      postImageModalIndex += 1;
      renderPostImageModal();
      return;
    }
    if (postImageModalIndex <= 0) return;
    postImageModalIndex -= 1;
    renderPostImageModal();
  });

  $(document).on("keydown", function (event) {
    if (event.key !== "Escape" || !$postImageModal.hasClass("active")) return;
    closePostImageModal();
  });

  randomizePostLiImages();
  setPostLiImagesLayout();
  syncMessagePostBtnActive();

  if ($postsBannerViewport.length > 0) {
    setPostsBannerDot(Math.max(0, $postsBannerDots.index($postsBannerDots.filter(".active"))));
    let postsBannerAutoSlideTimer = null;
    const autoSlideIntervalMs = 4000;

    function getCurrentBannerIndex() {
      const viewportWidth = $postsBannerViewport[0].clientWidth || 1;
      return Math.round($postsBannerViewport[0].scrollLeft / viewportWidth);
    }

    function scrollToBanner(index, behavior = "smooth") {
      const maxIndex = Math.max(0, $postsBannerDots.length - 1);
      const nextIndex = Math.max(0, Math.min(index, maxIndex));
      const viewportWidth = $postsBannerViewport[0].clientWidth || 1;
      $postsBannerViewport[0].scrollTo({
        left: viewportWidth * nextIndex,
        behavior,
      });
      setPostsBannerDot(nextIndex);
    }

    function startPostsBannerAutoSlide() {
      if ($postsBannerDots.length <= 1) return;
      if (postsBannerAutoSlideTimer) clearInterval(postsBannerAutoSlideTimer);

      postsBannerAutoSlideTimer = setInterval(function () {
        const currentIndex = getCurrentBannerIndex();
        const nextIndex = (currentIndex + 1) % $postsBannerDots.length;
        scrollToBanner(nextIndex);
      }, autoSlideIntervalMs);
    }

    $postsBannerDots.on("click", function () {
      const dotIndex = $postsBannerDots.index(this);
      scrollToBanner(dotIndex);
      startPostsBannerAutoSlide();
    });

    $postsBannerViewport.on("scroll", function () {
      const viewportWidth = this.clientWidth || 1;
      const bannerIndex = Math.round(this.scrollLeft / viewportWidth);
      setPostsBannerDot(bannerIndex);
    });

    $postsBannerViewport.on("touchend mouseup", function () {
      startPostsBannerAutoSlide();
    });

    startPostsBannerAutoSlide();
  }

  let touchStartX = 0;
  let touchStartY = 0;
  const homeInnerLastScrollTops = [];
  let isHomeChromeHiddenByScroll = false;
  const homeScrollThreshold = 8;

  $homeWrapperInners.each(function () {
    this.addEventListener(
      "scroll",
      function () {
        if (!this.classList.contains("active")) return;

        const panelIndex = $homeWrapperInners.index(this);
        const currentScrollTop = this.scrollTop;
        const prevScrollTop = homeInnerLastScrollTops[panelIndex] ?? 0;
        const delta = currentScrollTop - prevScrollTop;

        if (currentScrollTop <= 0) {
          if (isHomeChromeHiddenByScroll) {
            setHomeChromeHiddenByScroll(false);
            isHomeChromeHiddenByScroll = false;
          }
          homeInnerLastScrollTops[panelIndex] = 0;
          return;
        }

        if (delta > homeScrollThreshold && !isHomeChromeHiddenByScroll) {
          setHomeChromeHiddenByScroll(true);
          isHomeChromeHiddenByScroll = true;
        } else if (delta < -homeScrollThreshold && isHomeChromeHiddenByScroll) {
          setHomeChromeHiddenByScroll(false);
          isHomeChromeHiddenByScroll = false;
        }

        homeInnerLastScrollTops[panelIndex] = currentScrollTop;
      },
      { passive: true }
    );

    this.addEventListener(
      "touchstart",
      function (event) {
        const touch = event.changedTouches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
      },
      { passive: true }
    );

    this.addEventListener(
      "touchend",
      function (event) {
        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;

        if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
        if (deltaX < 0) {
          setHomeSlide(homeSlideIndex + 1);
          return;
        }
        setHomeSlide(homeSlideIndex - 1);
      },
      { passive: true }
    );
  });
});
