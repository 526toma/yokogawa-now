// Leaflet マップ（shop タブ表示時に初期化・APIキー不要）
let shopMapInstance = null;
function initShopMap() {
  if (shopMapInstance) return;
  const el = document.getElementById("shopMapContainer");
  if (!el || !el.offsetParent) return;
  const yokogawaStation = [34.4099, 132.4501];
  const map = L.map("shopMapContainer").setView(yokogawaStation, 17);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  shopMapInstance = map;

  const shops = [
    { name: "居酒屋 ひさ吉", lat: 34.4095, lng: 132.4505 },
    { name: "お好み焼き ふるや", lat: 34.4097, lng: 132.4498 },
    { name: "横川商店街振興組合", lat: 34.4099, lng: 132.4501 },
    { name: "カフェ 横川珈琲", lat: 34.4093, lng: 132.4508 },
    { name: "洋菓子店 パティスリーさくら", lat: 34.4102, lng: 132.4495 },
    { name: "居酒屋 海鮮やまちゃん", lat: 34.4091, lng: 132.4502 },
  ];

  shops.forEach(function (shop) {
    const marker = L.marker([shop.lat, shop.lng]).addTo(map);
    marker.bindPopup("<div class='p-2 font-medium'>" + shop.name + "</div>");
  });
  map.invalidateSize();
}

// 天気予報（Open-Meteo API・APIキー不要）
function loadTenki() {
  $("#tenkiWrapper").html('<span class="tenkiLoading"> 横川なう!</span>');
  const lat = 34.4099;
  const lng = 132.4501;
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    lat +
    "&longitude=" +
    lng +
    "&current=temperature_2m,weather_code&timezone=Asia/Tokyo";
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      const temp = Math.round(data.current.temperature_2m);
      const code = data.current.weather_code;
      const icons = {
        0: "☀️",
        1: "🌤️",
        2: "⛅",
        3: "☁️",
        45: "🌫️",
        48: "🌫️",
        51: "🌧️",
        53: "🌧️",
        55: "🌧️",
        61: "🌧️",
        63: "🌧️",
        65: "🌧️",
        71: "❄️",
        73: "❄️",
        75: "❄️",
        77: "❄️",
        80: "🌦️",
        81: "🌦️",
        82: "🌦️",
        85: "🌨️",
        86: "🌨️",
        95: "⛈️",
        96: "⛈️",
        99: "⛈️",
      };
      const icon = icons[code] || "☀️";
      $("#tenkiWrapper").html(
        '<div class="tenkiDisplay">' +
          '<span class="tenkiIcon">' + icon + "</span>" +
          '<span class="tenkiTemp">' + temp + "</span>" +
          "</div>"
      );
    })
    .catch(function () {
      $("#tenkiWrapper").html('<span class="text-xs text-gray-500">--</span>');
    });
}

$(function () {
  loadTenki();

  // tenki: クリックで最新に更新
  $(document).on("click", "#tenkiWrapper", function () {
    loadTenki();
  });

  // ホームバナースライダー（横スライド＋ドット）
  const BANNER_PADDING = 12;
  const BANNER_GAP = 12;
  const $viewport = $(".homeBannerViewport");
  const $track = $(".homeBannerTrack");
  const $slides = $(".homeBannerSlide");
  const $dots = $(".homeBannerDot");
  const slideCount = $slides.length;
  let currentIndex = 0;
  let bannerTimer = null;
  const INTERVAL = 5000;

  function getBannerLayout() {
    const viewportWidth = $viewport.width() || 0;
    const slideWidth = Math.max(0, viewportWidth - BANNER_PADDING * 2);
    const step = slideWidth + BANNER_GAP;
    return { viewportWidth, slideWidth, step };
  }
  function applyBannerLayout() {
    const { slideWidth } = getBannerLayout();
    $track.css({
      paddingLeft: BANNER_PADDING + "px",
      paddingRight: BANNER_PADDING + "px",
      gap: BANNER_GAP + "px",
    });
    $slides.css("width", slideWidth + "px");
  }
  function goToBanner(index) {
    if (slideCount === 0) return;
    const safeIndex = ((index % slideCount) + slideCount) % slideCount;
    currentIndex = safeIndex;
    const { step } = getBannerLayout();
    $track.css("transform", "translateX(" + -safeIndex * step + "px)");
    $dots.removeClass("active");
    $dots.eq(safeIndex).addClass("active");
  }
  function startBannerTimer() {
    if (bannerTimer) clearInterval(bannerTimer);
    if (slideCount <= 1) return;
    bannerTimer = setInterval(function () {
      goToBanner(currentIndex + 1);
    }, INTERVAL);
  }
  $(document).on("click", ".homeBannerDot", function () {
    goToBanner(Number($(this).data("index")) || 0);
    startBannerTimer();
  });
  // バナー左右フリック（無限ループ）
  (function () {
    const $banner = $(".homeBannerViewport");
    if (!$banner.length || slideCount <= 1) return;
    let startX = 0;
    const MIN_SWIPE = 40;
    $banner.on("touchstart", function (e) {
      if (e.originalEvent.touches.length !== 1) return;
      startX = e.originalEvent.touches[0].clientX;
    });
    $banner.on("touchend", function (e) {
      if (e.originalEvent.changedTouches.length !== 1) return;
      const endX = e.originalEvent.changedTouches[0].clientX;
      const deltaX = endX - startX;
      if (Math.abs(deltaX) < MIN_SWIPE) return;
      if (deltaX < 0) {
        goToBanner(currentIndex + 1);
        startBannerTimer();
      } else {
        goToBanner(currentIndex - 1);
        startBannerTimer();
      }
    });
  })();
  function fixBannerWhenVisible() {
    if (slideCount <= 0) return;
    setTimeout(function () {
      if ($("#homeBannerWrapper").is(":visible")) {
        applyBannerLayout();
        goToBanner(currentIndex);
        startBannerTimer();
      }
    }, 50);
  }

  if (slideCount > 0) {
    applyBannerLayout();
    goToBanner(0);
    startBannerTimer();
    $(window).on("resize", function () {
      applyBannerLayout();
      goToBanner(currentIndex);
    });
  }

  // homeBottomMenus: クリックで active 切り替え＋コンテンツ切り替え
  $(document).on("click", ".homeBottomMenus", function () {
    $(".homeBottomMenus").removeClass("active");
    $(this).addClass("active");
    const title = $(this).data("title");
    $(".homeContents").removeClass("active");
    $(`.homeContents[data-title="${title}"]`).addClass("active");
    $("#openPostBtn").toggleClass("openPostBtn-hidden", title !== "home");
    if (title === "shop" && typeof L !== "undefined") {
      setTimeout(initShopMap, 50);
    }
    if (title === "home") {
      switchToCategory("all");
      $("#homeFeedScroll").scrollTop(0);
    }
  });

  // スライドを最前面に: appendでDOM末尾に移動＋アニメーション用に1フレーム待つ
  function openSlide($el, onOpen) {
    const $stack = $("#slideStack");
    $el.removeClass("active");
    $el.removeClass("slide-shifted"); // 開くスライドは最前面なので 0px
    $stack.append($el);
    // 下になったスライドに slide-shifted を付与（append で戻さないので transition が効く）
    $stack.children().not($el).filter(".active").addClass("slide-shifted");
    $("#smaWrapper").addClass("is-slide-open");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        $el.addClass("active");
        if (typeof onOpen === "function") onOpen();
      });
    });
  }
  function closeSlide() {
    if (!$("#singleSlide").hasClass("active") && !$("#userInfoSlide").hasClass("active")) {
      $("#smaWrapper").removeClass("is-slide-open");
    }
  }
  // 閉じるとき：そのスライドだけ右にスライドアウト（滑らかに）、残るスライドの slide-shifted を外して 0px に戻す
  function closeSlideWithRestore($closingSlide) {
    const $stack = $("#slideStack");
    $closingSlide.addClass("slideClosing");
    $closingSlide.removeClass("active");
    // 閉じるスライド以外はすべて slide-shifted を外す（single→userinfo→single のとき userinfo が 0px に戻る）
    $stack.children().not($closingSlide).removeClass("slide-shifted");
    closeSlide();
    setTimeout(function () {
      $closingSlide.removeClass("slideClosing");
    }, 350);
  }

  // homeLi: クリックで singleSlide を右から表示
  $(document).on("click", ".homeLiLink", function (e) {
    e.preventDefault();
    if ($(this).hasClass("userInfoPostLink")) return;
    openSlide($("#singleSlide"), function () {
      $("#singleSlideWrapper").parent().scrollTop(0);
      setTimeout(function () {
        $(window).trigger("resize");
      }, 100);
    });
  });

  // closeSingleBtn: クリックで singleSlide を閉じる
  $(document).on("click", ".closeSingleBtn", function () {
    closeSlideWithRestore($("#singleSlide"));
  });

  // ユーザー別投稿サンプルデータ
  const USER_POSTS = {
    "地域住民A": [
      { title: "春の大感謝祭、楽しみです！", date: "2月28日", category: "tsubuyaki", img: "https://picsum.photos/seed/u1a/160/160" },
      { title: "横川商店街の新しいお店を発見", date: "2月25日", category: "tsubuyaki", img: "https://picsum.photos/seed/u1b/160/160" },
    ],
    "横川商店街振興組合": [
      { title: "横川商店街 春の大感謝祭 3/15開催", date: "2月28日", category: "event", img: "https://picsum.photos/seed/103/160/160" },
      { title: "横川商店街 夜店フェス 4/1〜4/3", date: "2月25日", category: "event", img: "https://picsum.photos/seed/108/160/160" },
      { title: "商店街マップを更新しました", date: "2月20日", category: "news", img: "https://picsum.photos/seed/u2c/160/160" },
    ],
    "カフェ店主": [
      { title: "当店も参加します。コーヒー無料券を景品に", date: "2月28日", category: "event", img: "https://picsum.photos/seed/109/160/160" },
      { title: "春の新作スイーツ登場", date: "2月26日", category: "news", img: "https://picsum.photos/seed/u3a/160/160" },
    ],
  };
  const CATEGORY_LABELS = { news: "ニュース", event: "イベント", tsubuyaki: "つぶやき", oshiete: "おしえて", yuzuri: "譲り" };

  function renderUserPostList(name, posts) {
    const list = Array.isArray(posts) ? posts : [];
    const $ul = $("#userInfoPostList");
    $ul.empty();
    list.forEach(function (p) {
      const badgeClass = "homeUlBadge homeUlBadge-" + (p.category || "tsubuyaki");
      const label = CATEGORY_LABELS[p.category] || p.category || "";
      $ul.append(
        '<li class="homeLi" data-category="' + (p.category || "") + '">' +
          '<a href="#" class="block homeLiLink userInfoPostLink">' +
            '<div class="gap-3 p-3 border-b homeLiInner fi active:bg-gray-50">' +
              '<div class="flex-shrink-0 w-20 h-20 overflow-hidden bg-gray-100 rounded">' +
                '<img src="' + (p.img || "") + '" alt="" class="object-cover w-full h-full" />' +
              '</div>' +
              '<div class="flex-1 min-w-0">' +
                '<p class="mb-2 text-base font-medium text-gray-800 homeLiTitle line-clamp-2">' + (p.title || "") + '</p>' +
                '<p class="text-xs text-gray-500 mt-0.5 fi gap-x-2 flex-wrap">' +
                  '<span>' + name + '</span>' +
                  '<span>' + (p.date || "") + '</span>' +
                  (label ? '<span class="' + badgeClass + '">' + label + '</span>' : "") +
                '</p>' +
              '</div>' +
            '</div>' +
          '</a>' +
        '</li>'
      );
    });
  }

  // userIconBtn: クリックで userInfoSlide を右から表示
  $(document).on("click", ".userIconBtn", function (e) {
    e.stopPropagation();
    const $el = $(this);
    const name = $el.data("user-name") || "";
    const avatar = $el.data("user-avatar") || $el.attr("src") || "";
    const bio = $el.data("user-bio") || "";
    const isMe = $el.data("user-is-me") === true || $el.data("user-is-me") === "true";
    const postsCount = $el.data("user-posts") || 0;
    const followersCount = $el.data("user-followers") || 0;
    const followingCount = $el.data("user-following") || 0;
    const handle = $el.data("user-handle") || "";
    const type = $el.data("user-type") || "";
    $("#userInfoAvatar").attr("src", avatar).attr("alt", name);
    $("#userInfoName").text(name);
    $("#userInfoBio").text(bio);
    $("#userInfoNameSub").text(type).toggle(!!type);
    $("#userInfoPostsCount").text(postsCount);
    $("#userInfoFollowersCount").text(followersCount);
    $("#userInfoFollowingCount").text(followingCount);
    $("#userInfoHandle").text(handle ? "@" + handle : "").toggle(!!handle);
    $("#userInfoEditBtn").toggleClass("hidden", !isMe);
    $("#userInfoFollowBtn").toggleClass("hidden", isMe);
    $("#userInfoMessageBtn").toggleClass("hidden", isMe);
    $("#userInfoBtnMore").toggleClass("hidden", isMe);
    renderUserPostList(name, USER_POSTS[name] || []);
    openSlide($("#userInfoSlide"));
  });

  // closeUserInfoBtn: クリックで userInfoSlide を閉じる
  $(document).on("click", ".closeUserInfoBtn", function () {
    closeSlideWithRestore($("#userInfoSlide"));
  });

  // userInfoPostLink: 投稿クリックで single を右から表示（userInfo の上に）
  $(document).on("click", ".userInfoPostLink", function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    openSlide($("#singleSlide"), function () {
      $("#singleSlideWrapper").parent().scrollTop(0);
    });
  });

  // singleSlide: 右フリックで閉じる（画像スライダー上では閉じない）
  (function () {
    let touchStartX = 0;
    let touchOnSlider = false;
    const MIN_SWIPE = 60;
    $("#singleSlide").on("touchstart.singleSwipe", function (e) {
      if (e.originalEvent.touches.length !== 1) return;
      touchStartX = e.originalEvent.touches[0].clientX;
      touchOnSlider = $(e.target).closest(".singleSlideViewport, .singleSlideArrowPrev, .singleSlideArrowNext").length > 0;
    });
    $("#singleSlide").on("touchend.singleSwipe", function (e) {
      if (e.originalEvent.changedTouches.length !== 1 || touchOnSlider) return;
      const deltaX = e.originalEvent.changedTouches[0].clientX - touchStartX;
      if (deltaX > MIN_SWIPE) {
        closeSlideWithRestore($("#singleSlide"));
      }
    });
  })();

  // userInfoSlide: 右フリックで閉じる
  (function () {
    let touchStartX = 0;
    const MIN_SWIPE = 60;
    $("#userInfoSlide").on("touchstart.userInfoSwipe", function (e) {
      if (e.originalEvent.touches.length !== 1) return;
      touchStartX = e.originalEvent.touches[0].clientX;
    });
    $("#userInfoSlide").on("touchend.userInfoSwipe", function (e) {
      if (e.originalEvent.changedTouches.length !== 1) return;
      const deltaX = e.originalEvent.changedTouches[0].clientX - touchStartX;
      if (deltaX > MIN_SWIPE) {
        closeSlideWithRestore($("#userInfoSlide"));
      }
    });
  })();

  // singleSlide 画像スライダー（矢印・ドット）
  (function () {
    const $viewport = $(".singleSlideViewport");
    const $track = $(".singleSlideTrack");
    const $slides = $(".singleSlideSlide");
    const $dots = $(".singleSlideDot");
    const slideCount = $slides.length;
    let singleSlideIndex = 0;

    function updateSingleSlideArrows() {
      $(".singleSlideArrowPrev").css("visibility", singleSlideIndex > 0 ? "visible" : "hidden");
      $(".singleSlideArrowNext").css("visibility", singleSlideIndex < slideCount - 1 ? "visible" : "hidden");
    }
    function goToSingleSlide(index) {
      if (slideCount === 0) return;
      singleSlideIndex = Math.max(0, Math.min(index, slideCount - 1));
      const w = $viewport.width() || 0;
      $track.css("transform", "translateX(" + -singleSlideIndex * w + "px)");
      $dots.removeClass("active");
      $dots.eq(singleSlideIndex).addClass("active");
      updateSingleSlideArrows();
    }

    $(document).on("click", ".singleSlideArrowPrev", function (e) {
      e.stopPropagation();
      goToSingleSlide(singleSlideIndex - 1);
    });
    $(document).on("click", ".singleSlideArrowNext", function (e) {
      e.stopPropagation();
      goToSingleSlide(singleSlideIndex + 1);
    });
    $(document).on("click", ".singleSlideDot", function () {
      goToSingleSlide(Number($(this).data("index")) || 0);
    });

    // 画像スライダー左右フリック
    if (slideCount > 1) {
      let flickStartX = 0;
      const MIN_SWIPE = 40;
      $viewport.on("touchstart.singleSlideFlick", function (e) {
        if (e.originalEvent.touches.length !== 1) return;
        flickStartX = e.originalEvent.touches[0].clientX;
      });
      $viewport.on("touchend.singleSlideFlick", function (e) {
        if (e.originalEvent.changedTouches.length !== 1) return;
        const deltaX = e.originalEvent.changedTouches[0].clientX - flickStartX;
        if (Math.abs(deltaX) < MIN_SWIPE) return;
        if (deltaX < 0) goToSingleSlide(singleSlideIndex + 1);
        else goToSingleSlide(singleSlideIndex - 1);
      });
    }

    if (slideCount > 0) {
      goToSingleSlide(0);
      $(window).on("resize", function () {
        goToSingleSlide(singleSlideIndex);
      });
    }
    window.getSingleSlideIndex = function () {
      return singleSlideIndex;
    };
  })();

  // 画像モーダル（カーテン＋画像横並び）
  function openImageModal() {
    const imgs = $(".singleSlideSlide img").map(function () {
      return $(this).attr("src");
    }).get();
    if (imgs.length === 0) return;
    const startIndex = (typeof window.getSingleSlideIndex === "function" ? window.getSingleSlideIndex() : Number($(".singleSlideDot.active").data("index"))) || 0;
    const $container = $("#imageModalCurtain .imageModalImages");
    const $dots = $("#imageModalCurtain .imageModalDots");
    $container.empty();
    $dots.empty();
    imgs.forEach(function (src, i) {
      $container.append('<div class="imageModalImg flex-shrink-0 w-full h-full fij snap-start pointer-events-none"><img src="' + src + '" alt="" class="imageModalImgEl pointer-events-auto" /></div>');
      $dots.append('<button type="button" class="imageModalDot pointer-events-auto' + (i === startIndex ? " active" : "") + '" data-index="' + i + '"></button>');
    });
    const n = imgs.length;
    let modalIndex = startIndex;
    $("#imageModalCurtain").addClass("imageModalCurtainActive");
    $("body").css("overflow", "hidden");
    $container.addClass("imageModalScrollInstant");
    requestAnimationFrame(function () {
      $container.scrollLeft(startIndex * ($container.width() || window.innerWidth));
      $container.removeClass("imageModalScrollInstant");
    });
    function updateUI() {
      $(".imageModalArrowPrev").css("visibility", modalIndex > 0 ? "visible" : "hidden");
      $(".imageModalArrowNext").css("visibility", modalIndex < n - 1 ? "visible" : "hidden");
      $dots.find(".imageModalDot").removeClass("active").eq(modalIndex).addClass("active");
    }
    function scrollToIndex(i) {
      if (n === 0) return;
      modalIndex = Math.max(0, Math.min(i, n - 1));
      const $el = $container.find(".imageModalImg").eq(modalIndex);
      if ($el.length) $el[0].scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      updateUI();
    }
    let scrollTimeout;
    $container.on("scroll.imageModal", function () {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function () {
        const scrollLeft = $container.scrollLeft();
        const width = $container.width();
        if (width <= 0) return;
        const newIndex = Math.round(scrollLeft / width);
        if (newIndex !== modalIndex && newIndex >= 0 && newIndex < n) {
          modalIndex = newIndex;
          updateUI();
        }
      }, 50);
    });
    $(document).on("keydown.imageModal", function (e) {
      if (e.key === "Escape") closeImageModal();
    });
    $(".imageModalArrowPrev").off("click.imageModal").on("click.imageModal", function (e) {
      e.stopPropagation();
      scrollToIndex(modalIndex - 1);
    });
    $(".imageModalArrowNext").off("click.imageModal").on("click.imageModal", function (e) {
      e.stopPropagation();
      scrollToIndex(modalIndex + 1);
    });
    $dots.off("click.imageModal", ".imageModalDot").on("click.imageModal", ".imageModalDot", function (e) {
      e.stopPropagation();
      scrollToIndex(Number($(this).data("index")) || 0);
    });
    // 画像モーダル左右フリック＋境界でのオーバースクロール防止
    let modalLastTouchX = 0;
    let modalFlickStartX = 0;
    $container.on("touchstart.imageModalFlick", function (e) {
      if (e.originalEvent.touches.length !== 1) return;
      modalLastTouchX = modalFlickStartX = e.originalEvent.touches[0].clientX;
    });
    const el = $container[0];
    function onTouchMove(e) {
      if (e.touches.length !== 1) return;
      const x = e.touches[0].clientX;
      const deltaX = x - modalLastTouchX;
      modalLastTouchX = x;
      const sl = $container.scrollLeft();
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (sl <= 0 && deltaX > 0) e.preventDefault();
      else if (maxScroll > 0 && sl >= maxScroll - 1 && deltaX < 0) e.preventDefault();
    }
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    if (n > 1) {
      const MIN_SWIPE = 40;
      $container.on("touchend.imageModalFlick", function (e) {
        if (e.originalEvent.changedTouches.length !== 1) return;
        const deltaX = e.originalEvent.changedTouches[0].clientX - modalFlickStartX;
        if (Math.abs(deltaX) < MIN_SWIPE) return;
        if (deltaX < 0) scrollToIndex(modalIndex + 1);
        else scrollToIndex(modalIndex - 1);
      });
    }
    window._closeImageModal = closeImageModal;
    function closeImageModal() {
      clearTimeout(scrollTimeout);
      $("#imageModalCurtain").removeClass("imageModalCurtainActive");
      $("body").css("overflow", "");
      $(document).off("keydown.imageModal");
      $(".imageModalArrowPrev, .imageModalArrowNext").off("click.imageModal");
      el.removeEventListener("touchmove", onTouchMove);
      $container.off("scroll.imageModal").off("touchstart.imageModalFlick touchend.imageModalFlick");
      $dots.off("click.imageModal");
    }
    updateUI();
  }
  $(document).on("click", ".singleSlideImageClickArea", function (e) {
    if ($(e.target).closest(".singleSlideNoModal").length) return;
    openImageModal();
  });
  $(document).on("click", ".imageModalCurtain", function (e) {
    if ($(e.target).closest(".imageModalImg").length || $(e.target).closest(".imageModalCurtainClose").length || $(e.target).closest(".imageModalArrowPrev").length || $(e.target).closest(".imageModalArrowNext").length || $(e.target).closest(".imageModalDots").length) return;
    if (typeof window._closeImageModal === "function") window._closeImageModal();
  });
  $(document).on("click", ".imageModalCurtainClose", function (e) {
    e.stopPropagation();
    if (typeof window._closeImageModal === "function") window._closeImageModal();
  });

  // スライドインジケーターの位置・サイズを更新
  function updateHomeMenuIndicator() {
    const $active = $(".homeMenuBtns.active");
    const $indicator = $("#homeMenuBtnsIndicator");
    if ($active.length && $indicator.length) {
      const active = $active[0];
      $indicator.css({ left: active.offsetLeft + "px", width: active.offsetWidth + "px" });
    }
  }

  // カテゴリ一覧（headメニュー・ulの順序）
  const CATEGORY_ORDER = ["all", "news", "event", "tsubuyaki", "oshiete", "yuzuri"];

  // カテゴリ切り替え（headメニュー・ul・バナー・スクロール位置を更新）
  function switchToCategory(category) {
    $(".homeMenuBtns").removeClass("active");
    $(`.homeMenuBtns[data-category="${category}"]`).addClass("active");
    updateHomeMenuIndicator();
    $("#homeFeedScroll").scrollTop(0);
    $("#homeBannerWrapper").toggle(category === "all");
    if (category === "all") fixBannerWhenVisible();
    $(".homeLi").each(function () {
      const liCat = $(this).data("category");
      const show = category === "all" || liCat === category;
      $(this).toggle(show);
    });
    const $wrapper = $("#homeHeaderWrapperDown");
    const $item = $(`.homeMenuBtns[data-category="${category}"]`);
    const wrapper = $wrapper[0];
    const item = $item[0];
    if (wrapper && item) {
      const itemRect = item.getBoundingClientRect();
      const wrapperRect = wrapper.getBoundingClientRect();
      const scrollLeft =
        wrapper.scrollLeft +
        (itemRect.left - wrapperRect.left) -
        wrapperRect.width / 2 +
        itemRect.width / 2;
      const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
      const targetScroll = Math.max(0, Math.min(scrollLeft, maxScroll));
      $wrapper.animate({ scrollLeft: targetScroll }, 250);
    }
    setTimeout(updateHomeMenuIndicator, 260);
  }

  // homeMenuBtns: クリックでカテゴリ切り替え
  $(document).on("click", ".homeMenuBtns", function () {
    switchToCategory($(this).data("category"));
  });

  // 左右フリックでheadメニューを切り替え（headerメニュー上では発火しない・バナー上でも発火しない）
  (function () {
    const $el = $("#homeFeedScroll");
    const $banner = $("#homeBannerWrapper");
    const $headerMenu = $("#homeHeaderWrapperDown");
    if (!$el.length) return;
    let startX = 0;
    let startY = 0;
    let touchOnBanner = false;
    let touchOnHeaderMenu = false;
    const MIN_SWIPE = 50;
    $el.on("touchstart", function (e) {
      if (e.originalEvent.touches.length !== 1) return;
      startX = e.originalEvent.touches[0].clientX;
      startY = e.originalEvent.touches[0].clientY;
      touchOnBanner = $banner.length && $(e.target).closest("#homeBannerWrapper").length > 0;
      touchOnHeaderMenu = $headerMenu.length && $(e.target).closest("#homeHeaderWrapperDown").length > 0;
    });
    $el.on("touchend", function (e) {
      if (e.originalEvent.changedTouches.length !== 1) return;
      if (touchOnBanner || touchOnHeaderMenu) return;
      if (!$(".homeContents[data-title='home']").hasClass("active")) return;
      const endX = e.originalEvent.changedTouches[0].clientX;
      const endY = e.originalEvent.changedTouches[0].clientY;
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      if (Math.abs(deltaX) < MIN_SWIPE || Math.abs(deltaX) <= Math.abs(deltaY)) return;
      const currentCat = $(".homeMenuBtns.active").data("category");
      const idx = CATEGORY_ORDER.indexOf(currentCat);
      if (idx < 0) return;
      if (deltaX < 0 && idx < CATEGORY_ORDER.length - 1) {
        switchToCategory(CATEGORY_ORDER[idx + 1]);
      } else if (deltaX > 0 && idx > 0) {
        switchToCategory(CATEGORY_ORDER[idx - 1]);
      }
    });
  })();

  // 初回・リサイズ時にインジケーター位置を設定
  updateHomeMenuIndicator();
  $(window).on("resize", updateHomeMenuIndicator);

  // 投稿いいね（トグル＋カウント更新）
  $(document).on("click", ".postLikeBtn", function () {
    const $btn = $(this);
    const $icon = $btn.find(".postLikeIcon");
    const $count = $btn.find(".postLikeCount");
    const liked = $btn.hasClass("postLiked");
    let n = parseInt($count.text(), 10) || 0;
    if (liked) {
      $btn.removeClass("postLiked");
      $icon.attr("fill", "none");
      $count.text(Math.max(0, n - 1));
    } else {
      $btn.addClass("postLiked");
      $icon.attr("fill", "currentColor");
      $count.text(n + 1);
    }
  });

  // コメントボタン：コメント欄までスクロール
  $(document).on("click", ".postCommentBtn", function () {
    const $target = $("#singleCommentSection");
    if ($target.length) {
      $target[0].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // コメントいいね（トグル＋カウント更新）
  $(document).on("click", ".commentLikeBtn", function () {
    const $btn = $(this);
    const $icon = $btn.find(".commentLikeIcon");
    const $count = $btn.find(".commentLikeCount");
    const liked = $btn.hasClass("commentLiked");
    let n = parseInt($count.text(), 10) || 0;
    if (liked) {
      $btn.removeClass("commentLiked");
      $icon.attr("fill", "none");
      $count.text(Math.max(0, n - 1));
    } else {
      $btn.addClass("commentLiked");
      $icon.attr("fill", "currentColor");
      $count.text(n + 1);
    }
  });
});
