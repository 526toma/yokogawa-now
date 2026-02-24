// jQueryが読み込まれたことを確認
$(document).ready(function () {
  console.log("jQueryが正常に読み込まれました！");
  console.log("jQueryバージョン:", $.fn.jquery);
  const $mainHeaderMenuBtns = $(".mainHeaderMenuBtns");
  const $mainHeaderMenuWrapper = $("#mainHeaderMenuWrapper");
  const $homeWrapperInners = $(".homeWrapperInner");
  const $homeSliderTrack = $("#homeSliderTrack");
  const $bottomMenus = $(".bottomMenu");
  const $contentsWrappers = $(".contentsWrapper");
  const $mainHeaderWrapper = $("#mainHeaderWrapper");
  const $bottomMenuWrapper = $("#bottomMenuWrapper");
  const $openPostFormBtn = $("#openPostFormBtn");
  const $openToLeftSlide = $(".openToLeftSlide");
  const $openToUpSlide = $(".openToUpSlide");
  const $closeToLeftSlide = $(".closeToLeftSlide");
  const $closeToUpSlide = $(".closeToUpSlide");
  const $toLeftSlide = $("#toLeftSlide");
  const $toUpSlide = $("#toUpSlide");
  let $toLeftSlideInners = $(".toLeftSlideInner");
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
  const $singleConfigBtn = $(".singleConfigBtn");
  const $singleBody = $("#singleBody");
  const $singleBodyInner = $("#singleBodyInner");
  const $singleActionSheetRoot = $("#singleActionSheetRoot");
  const $singleActionSheetCurtain = $("#singleActionSheetCurtain");
  const $singleActionSheetCancel = $("#singleActionSheetCancel");
  const $cofigUserInfoSlide = $(".cofigUserInfoSlide");
  const $userInfoActionSheetRoot = $("#userInfoActionSheetRoot");
  const $userInfoActionSheetCurtain = $("#userInfoActionSheetCurtain");
  const $userInfoActionSheetCancel = $("#userInfoActionSheetCancel");
  const $userInfoSlide = $("#userInfoSlide");
  const $userInfoSlideIcon = $("#userInfoSlide .icon_bg").first();
  const $closeUserInfoSlide = $(".closeUserInfoSlide");
  const $messageInput = $("#messageInput");
  const $messagePostBtn = $("#messagePostBtn");
  const $createPostTypeView = $("#createPostTypeView");
  const $createPostFormView = $("#createPostFormView");
  const $createPostImageInput = $("#createPostImageInput");
  const $createPostImagePreview = $("#createPostImagePreview");
  const $createPostDefaultTextWrap = $("#createPostDefaultTextWrap");
  const $createPostYuzuriDetailWrap = $("#createPostYuzuriDetailWrap");
  const $createPostYuzuriTitle = $("#createPostYuzuriTitle");
  const $createPostYuzuriBody = $("#createPostYuzuriBody");
  const $createPostYuzuriPrice = $("#createPostYuzuriPrice");
  const $createPostYuzuriCategory = $("#createPostYuzuriCategory");
  const $createPostYuzuriPlace = $("#createPostYuzuriPlace");
  const $createPostContent = $("#createPostContent");
  const $createPostSubmitBtn = $("#createPostSubmitBtn");
  const $createPostSlideTitle = $("#createPostSlideTitle");
  const $createPostTags = $("#createPostTags");
  const $createPostTagsWrap = $("#createPostTagsWrap");
  const $createPostAnonymousWrap = $("#createPostAnonymousWrap");
  const $createPostAnonymousToggle = $("#createPostAnonymousToggle");
  const $createPostEventWrap = $("#createPostEventWrap");
  const $createPostEventName = $("#createPostEventName");
  const $createPostEventStartDate = $("#createPostEventStartDate");
  const $createPostEventEndDate = $("#createPostEventEndDate");
  const $toUpSlideCloseIcon = $("#toUpSlideCloseIcon");
  const $toUpSlideBackIcon = $("#toUpSlideBackIcon");
  const $profileEditSlide = $("#profileEditSlide");
  const $mypageOptionSlide = $("#mypageOptionSlide");
  const $mypageMainBody = $("#mypageMainBody");
  const $profileEditImageInput = $("#profileEditImageInput");
  const CREATE_POST_MAX_IMAGES = 4;
  let createPostSelectedFiles = [];
  let activeCreatePostType = "post";
  const createPostTypeConfig = {
    post: {
      title: "つぶやき",
      placeholder: "例）街の発見をつぶやく",
      submitLabel: "投稿する",
      tags: ["#つぶやき", "#まちメモ日記", "#グルメ", "#地域活動", "#防災・防犯", "#雑談"],
      defaultActiveTags: ["#つぶやき"],
      allowAnonymous: false,
      allowEventFields: false,
      allowYuzuriFields: false,
    },
    oshiete: {
      title: "おしえて",
      placeholder: "例）習い事を探しています。ご存知の方は教えてください。",
      submitLabel: "投稿する",
      tags: [
        "#おしえて",
        "#お得情報",
        "#グルメ",
        "#地域活動",
        "#子育て",
        "#病院",
        "#行ってみた",
        "#開店・閉店情報",
        "#遊び場",
        "#雑談",
      ],
      defaultActiveTags: ["#おしえて"],
      allowAnonymous: true,
      allowEventFields: false,
      allowYuzuriFields: false,
    },
    recruit: {
      title: "募集",
      placeholder: "例）一緒に〇〇しよう、一緒に飲みに行こう、花見のメンバー募集など",
      submitLabel: "投稿する",
      tags: ["#募集", "#お得情報", "#地域活動", "#子育て", "#病院", "#行ってみた", "#遊び場", "#雑談"],
      defaultActiveTags: ["#募集"],
      allowAnonymous: false,
      allowEventFields: false,
    },
    event: {
      title: "イベント",
      placeholder: "例）みんなの家カレー発表会を開催します！",
      submitLabel: "投稿する",
      tags: ["#イベント", "#地域活動", "#子育て", "#グルメ", "#遊び場", "#雑談"],
      defaultActiveTags: ["#イベント"],
      allowAnonymous: false,
      allowEventFields: true,
      allowYuzuriFields: false,
    },
    yuzuri: {
      title: "譲り合い",
      placeholder: "例）譲りたいものや条件を入力する",
      submitLabel: "投稿する",
      tags: [],
      defaultActiveTags: [],
      allowAnonymous: false,
      allowEventFields: false,
      allowYuzuriFields: true,
    },
  };
  let homeSlideIndex = Math.max(0, $mainHeaderMenuBtns.index($mainHeaderMenuBtns.filter(".active")));
  const maxHomeSlideIndex = Math.min($mainHeaderMenuBtns.length, $homeWrapperInners.length) - 1;
  let postImageModalSources = [];
  let postImageModalIndex = 0;
  let postImageModalTouchStartX = 0;
  let postImageModalTouchStartY = 0;
  let toLeftSlideTouchStartX = 0;
  let toLeftSlideTouchStartY = 0;
  let toUpSlideTouchStartX = 0;
  let toUpSlideTouchStartY = 0;
  let userInfoSlideTouchStartX = 0;
  let userInfoSlideTouchStartY = 0;
  let dynamicPanelTouchStartX = 0;
  let dynamicPanelTouchStartY = 0;
  const $dynamicSlideRoot = $("#dynamicSlideRoot");
  let dynamicSlideZ = 60;

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

  function openDynamicSlide(contentHtml, panelClass) {
    if ($dynamicSlideRoot.length === 0) return $();
    const zIndex = dynamicSlideZ++;
    $homeInner.addClass("slideLeft");
    const $prevTop = $dynamicSlideRoot.children(".dynamicSlidePanel").last();
    if ($prevTop.length > 0) {
      $prevTop.addClass("slideLeft");
    }
    const $panel = $(`
      <div class="absolute top-0 left-0 w-full h-full bg-white transition duration-300 pointer-events-auto dynamicSlidePanel ${panelClass}" style="z-index:${zIndex}">
        ${contentHtml}
      </div>
    `);
    $dynamicSlideRoot.append($panel);
    requestAnimationFrame(function () {
      $panel.addClass("active");
    });
    return $panel;
  }

  function openDynamicSingleFromPost($sourcePost) {
    const $postClone = $sourcePost.clone();
    $postClone.find(".postLiComments").remove();
    $postClone.removeClass("border-b cursor-pointer hover:bg-gray-50");
    $postClone.addClass("border-b-0 cursor-auto");
    $postClone.find(".postLiImage").addClass("cursor-pointer");
    $postClone.find(".potLiBtns button, .potLiBtns .gap-x-1").addClass("cursor-pointer");
    const singleHtml = `
      <div class="relative w-full h-full">
        <div class="absolute top-0 left-0 z-10 w-full bg-white">
          <div class="relative w-full h-12 fij">
            <div class="absolute top-0 left-0 z-10 cursor-pointer size-12 fij dynamicPanelClose">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </div>
            <div class="absolute top-0 right-0 z-10 cursor-pointer size-12 fij singleConfigBtn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
            </div>
          </div>
        </div>
        <div class="h-full pt-12 overflow-auto bg-gray-100" style="padding-bottom: 7rem">
          <div class="dynamicSingleBodyInner"></div>
          <div class="px-4 bg-white">
            <ul>
              <li class="relative flex singleCommentsLi gap-x-2">
                <div class="flex-shrink-0 bg-gray-100 rounded-full size-10 icon_bg" style="background-image: url(https://xsgames.co/randomusers/assets/avatars/male/74.jpg);"></div>
                <div>
                  <div class="flex-grow p-3 mb-3 bg-gray-100 rounded-xl">
                    <p>name</p>
                    <p class="text-sm">commentcommentcommentcommentcomment</p>
                    <p class="text-xs">2/23 13:01</p>
                    <div class="flex">
                      <div class="flex items-center ml-auto gap-x-1">
                        <button type="button" class="ml-auto postLiCommentFavoBtn">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                        </button>
                        <p class="text-xs">1</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="relative flex singleCommentsLi gap-x-2">
                <div class="flex-shrink-0 bg-gray-100 rounded-full size-10 icon_bg" style="background-image: url(https://xsgames.co/randomusers/assets/avatars/female/22.jpg);"></div>
                <div>
                  <div class="flex-grow p-3 mb-3 bg-gray-100 rounded-xl">
                    <p>name</p>
                    <p class="text-sm">commentcommentcommentcommentcommentcommentcommentcommentcommentcommentcommentcommentcommentcommentcommentcommentcommentcommentcommentcomment</p>
                    <p class="text-xs">2/23 13:01</p>
                    <div class="flex">
                      <div class="flex items-center ml-auto gap-x-1">
                        <button type="button" class="ml-auto postLiCommentFavoBtn">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                        </button>
                        <p class="text-xs">1</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 z-10 w-full pb-3 bg-white border-t rounded-t-xl" style="height: 7rem">
          <div class="px-4 pt-3 dynamicSingleComposer">
            <input type="text" class="w-full px-3 mb-1.5 border rounded-lg h-9 bg-gray-50 dynamicMessageInput" placeholder="メッセージ" />
            <div class="fi">
              <input type="file" class="hidden" id="dynamicMessageFileBtn" />
              <label for="dynamicMessageFileBtn" class="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="stroke-blue-500">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M20.4 14.5L16 10 4 20" />
                </svg>
              </label>
              <button type="button" class="h-8 px-3 ml-auto text-xs text-gray-500 bg-gray-100 rounded-full fij dynamicMessagePostBtn" disabled>
                コメントする
              </button>
            </div>
          </div>
        </div>
        <div id="singleActionSheetRoot" class="singleActionSheetRoot" aria-hidden="true">
          <button id="singleActionSheetCurtain" type="button" class="singleActionSheetCurtain" aria-label="アクションシートを閉じる"></button>
          <div id="singleActionSheet" class="singleActionSheet" role="dialog" aria-modal="true">
            <div class="singleActionSheetGroup">
              <button type="button" class="singleActionSheetItem">共有する</button>
              <button type="button" class="singleActionSheetItem">ブックマークする</button>
              <button type="button" class="singleActionSheetItem danger">この投稿を運営に報告する</button>
            </div>
            <button id="singleActionSheetCancel" type="button" class="singleActionSheetCancel">キャンセル</button>
          </div>
        </div>
      </div>
    `;
    const $panel = openDynamicSlide(singleHtml, "dynamic-single");
    $panel.find(".dynamicSingleBodyInner").empty().append($postClone);
  }

  function openDynamicUserInfo(iconBackgroundImage = "") {
    const userInfoHtml = `
      <div class="relative w-full h-full">
        <div class="absolute top-0 left-0 z-10 w-full h-12 bg-white fij">
          <div class="absolute top-0 left-0 cursor-pointer size-12 fij dynamicPanelClose">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </div>
          <p class="font-bold">プロフィール</p>
          <div class="absolute top-0 right-0 cursor-pointer size-12 fij cofigUserInfoSlide">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </div>
        </div>
        <div class="h-full pt-12 overflow-auto bg-gray-100">
          <div class="px-4 pt-2 pb-4 mb-3 bg-white">
            <div class="flex mb-4 gap-x-3">
              <div class="flex-shrink-0 bg-gray-100 rounded-full size-16 icon_bg dynamicUserInfoIcon"></div>
              <div class="flex-grow">
                <p class="font-bold">name</p>
                <p class="mb-2 text-sm">text</p>
                <div class="flex mb-2 text-sm gap-x-3">
                  <div class="flex gap-x-1">
                    <p>フォロー</p>
                    <p class="font-bold text-blue-500 cursor-pointer">1</p>
                  </div>
                  <div class="flex gap-x-1">
                    <p>フォロワー</p>
                    <p class="font-bold text-blue-500 cursor-pointer">1</p>
                  </div>
                </div>
                <div class="flex w-full gap-x-3">
                  <button
                    type="button"
                    class="w-1/2 h-7 text-xs font-bold text-blue-500 border border-blue-500 rounded-full fij hover:bg-blue-50 dynamicFollowToggleBtn"
                  >
                    フォローする
                  </button>
                  <button
                    type="button"
                    class="w-1/2 h-7 text-xs font-bold text-blue-500 border border-blue-500 rounded-full fij hover:bg-blue-50 openDynamicMessageSlide"
                  >
                    メッセージを送る
                  </button>
                </div>
              </div>
            </div>
            <p class="mb-4 text-sm userInfoText">
              texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
            </p>
            <div class="p-3 text-gray-500 bg-gray-100 rounded userInfoData fi gap-x-3">
              <div class="flex p-2 bg-white rounded gap-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="flex-shrink-0"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  ></path>
                </svg>
                <div>
                  <p class="text-xs">もらったイイネ</p>
                  <p class="font-bold text-md">123</p>
                </div>
              </div>
              <div class="flex p-2 bg-white rounded gap-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="flex-shrink-0"
                >
                  <path
                    d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                  ></path>
                </svg>
                <div>
                  <p class="text-xs">もらったコメント</p>
                  <p class="font-bold text-md">123</p>
                </div>
              </div>
            </div>
          </div>
          <div><ul class="dynamicUserInfoPosts"></ul></div>
        </div>
      </div>
    `;
    const $panel = openDynamicSlide(userInfoHtml, "dynamic-user-info");
    if (iconBackgroundImage && iconBackgroundImage !== "none") {
      $panel.find(".dynamicUserInfoIcon").css("background-image", iconBackgroundImage);
    }
    const $samplePost = $(".homeWrapperInner.active .postLi").first().clone();
    if ($samplePost.length > 0) {
      $panel.find(".dynamicUserInfoPosts").append($samplePost);
    }
  }

  function openDynamicMessageSlide() {
    const messageHtml = `
      <div class="relative w-full h-full">
        <div class="absolute top-0 left-0 z-10 w-full bg-white">
          <div class="relative w-full h-12 fij">
            <div class="absolute top-0 left-0 z-10 cursor-pointer size-12 fij dynamicPanelClose">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </div>
            <p class="font-bold">メッセージ</p>
          </div>
        </div>
        <div class="h-full pt-12 overflow-auto bg-gray-100" style="padding-bottom: 7rem">
          <div class="px-3 py-3 space-y-3">
            <div class="flex items-end gap-x-1">
              <div
                class="flex-shrink-0 bg-gray-200 rounded-full size-8 icon_bg cursor-pointer dynamicDmProfileTrigger"
                style="background-image: url(https://xsgames.co/randomusers/assets/avatars/female/22.jpg);"
                data-profile-name="ピアッザ公式"
                data-profile-desc="ピアッザです！\n皆様と一緒に現代版のご近所ネットワークを創れることをこころより願っています。\nよろしくお願いいたします！\n\nこのアカウントにDMをいただいても返信できかねます。"
              ></div>
              <div>
                <div class="px-3 py-2 bg-white rounded-2xl rounded-bl-sm">
                  <p class="text-sm leading-relaxed">こんにちは！今日どう？</p>
                </div>
                <p class="mt-1 text-[11px] text-gray-400">13:02</p>
              </div>
            </div>
            <div class="flex items-end justify-end gap-x-1">
              <div class="text-right">
                <div class="px-3 py-2 text-white bg-blue-500 rounded-2xl rounded-br-sm">
                  <p class="text-sm leading-relaxed">今ちょうど空いたよ！</p>
                </div>
                <p class="mt-1 text-[11px] text-gray-400">13:04 既読</p>
              </div>
              <div
                class="flex-shrink-0 bg-gray-200 rounded-full size-8 icon_bg cursor-pointer dynamicDmProfileTrigger"
                style="background-image: url(https://xsgames.co/randomusers/assets/avatars/male/74.jpg);"
                data-profile-name="name"
                data-profile-desc="texttexttexttexttexttexttexttexttexttext"
              ></div>
            </div>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 z-10 w-full pb-3 bg-white border-t rounded-t-xl" style="height: 7rem">
          <div class="px-4 pt-3 dynamicDmComposer">
            <input type="text" class="w-full px-3 mb-1.5 border rounded-lg h-9 bg-gray-50 dynamicDmInput" placeholder="メッセージ" />
            <div class="fi">
              <label class="cursor-pointer">
                <input type="file" class="hidden dynamicDmFileBtn" />
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="stroke-blue-500">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M20.4 14.5L16 10 4 20" />
                </svg>
              </label>
              <button type="button" class="h-8 px-3 ml-auto text-xs text-gray-500 bg-gray-100 rounded-full fij dynamicDmSendBtn" disabled>
                送信する
              </button>
            </div>
          </div>
        </div>
        <div class="dynamicDmProfileModalRoot" aria-hidden="true">
          <button type="button" class="dynamicDmProfileModalCurtain" aria-label="プロフィールモーダルを閉じる"></button>
          <div class="dynamicDmProfileModalCard">
            <div class="dynamicDmProfileModalIcon icon_bg"></div>
            <p class="dynamicDmProfileModalName">name</p>
            <p class="dynamicDmProfileModalDesc"></p>
          </div>
        </div>
      </div>
    `;
    openDynamicSlide(messageHtml, "dynamic-message");
  }

  function openCreateTemplateSlide() {
    const templateHtml = `
      <div class="relative w-full h-full">
        <div class="absolute top-0 left-0 z-10 w-full bg-white">
          <div class="relative w-full h-12 fij">
            <div class="absolute top-0 left-0 z-10 cursor-pointer size-12 fij dynamicPanelClose">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </div>
            <p class="font-bold">定型文</p>
          </div>
        </div>
        <div class="h-full pt-12 overflow-auto bg-gray-100">
          <div class="p-3 space-y-2">
            <button type="button" class="w-full p-3 text-sm text-left bg-white rounded-lg">【挨拶】こんにちは、よろしくお願いします。</button>
            <button type="button" class="w-full p-3 text-sm text-left bg-white rounded-lg">【依頼】ご存知の方がいれば教えてください。</button>
            <button type="button" class="w-full p-3 text-sm text-left bg-white rounded-lg">【募集】参加できる方はコメントください。</button>
          </div>
        </div>
      </div>
    `;
    $toUpSlide.addClass("slideLeft");
    openDynamicSlide(templateHtml, "dynamic-create-template");
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

  function openSingleActionSheet($context) {
    const $root =
      $context && $context.length > 0
        ? $context.find("#singleActionSheetRoot").first()
        : $("#singleActionSheetRoot").last();
    if ($root.length === 0) return;
    $root.attr("aria-hidden", "false").addClass("active");
  }

  function closeSingleActionSheet($root) {
    const $targets = $root && $root.length > 0 ? $root : $("#singleActionSheetRoot");
    if ($targets.length === 0) return;
    $targets.attr("aria-hidden", "true").removeClass("active");
  }

  function openUserInfoActionSheet() {
    if ($userInfoActionSheetRoot.length === 0) return;
    $userInfoActionSheetRoot.attr("aria-hidden", "false").addClass("active");
  }

  function closeUserInfoActionSheet() {
    if ($userInfoActionSheetRoot.length === 0) return;
    $userInfoActionSheetRoot.attr("aria-hidden", "true").removeClass("active");
  }

  function bringUserInfoToFront() {
    $toLeftSlide.css("z-index", 20);
    $userInfoSlide.css("z-index", 40);
  }

  function bringToLeftSlideToFront() {
    $toLeftSlide.css("z-index", 40);
    $userInfoSlide.css("z-index", 30);
  }

  function resetSlideLayerOrder() {
    $toLeftSlide.css("z-index", 20);
    $userInfoSlide.css("z-index", 30);
  }

  function openUserInfoSlide(iconBackgroundImage = "") {
    if ($userInfoSlide.length === 0) return;
    if ($userInfoSlideIcon.length > 0) {
      $userInfoSlideIcon.css("background-image", iconBackgroundImage && iconBackgroundImage !== "none" ? iconBackgroundImage : "none");
    }
    bringUserInfoToFront();
    $userInfoSlide.addClass("active");
    $homeInner.addClass("slideLeft");
    $toLeftSlide.addClass("slideLeft");
  }

  function closeUserInfoSlide() {
    if ($userInfoSlide.length === 0) return;
    closeUserInfoActionSheet();
    $userInfoSlide.removeClass("active");
    resetSlideLayerOrder();
    $toLeftSlide.removeClass("slideLeft");
    if (!$toLeftSlide.hasClass("active")) {
      $homeInner.removeClass("slideLeft");
    }
  }

  function closeDynamicPanel($panel) {
    if (!$panel || $panel.length === 0) return;
    const isClosingLastDynamicPanel = $dynamicSlideRoot.children(".dynamicSlidePanel").length === 1;
    const $prevPanel = $panel.prevAll(".dynamicSlidePanel").first();
    if ($prevPanel.length > 0) {
      $prevPanel.removeClass("slideLeft");
    }
    if (isClosingLastDynamicPanel && !$toLeftSlide.hasClass("active")) {
      $homeInner.removeClass("slideLeft");
    }
    if (isClosingLastDynamicPanel && $toUpSlide.hasClass("active")) {
      $toUpSlide.removeClass("slideLeft");
    }
    $panel.removeClass("active");
    setTimeout(function () {
      $panel.remove();
    }, 300);
  }

  function centerMainHeaderMenuBtn(index, behavior = "smooth") {
    if ($mainHeaderMenuWrapper.length === 0 || $mainHeaderMenuBtns.length === 0) return;
    const wrapper = $mainHeaderMenuWrapper[0];
    const button = $mainHeaderMenuBtns.eq(index)[0];
    if (!wrapper || !button) return;

    const maxScrollLeft = Math.max(0, wrapper.scrollWidth - wrapper.clientWidth);
    const targetScrollLeft = button.offsetLeft - (wrapper.clientWidth - button.clientWidth) / 2;
    const nextScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScrollLeft));
    wrapper.scrollTo({ left: nextScrollLeft, behavior });
  }

  function setHomeSlide(index, menuScrollBehavior = "smooth") {
    if (maxHomeSlideIndex < 0) return;

    const nextIndex = Math.max(0, Math.min(index, maxHomeSlideIndex));
    homeSlideIndex = nextIndex;

    $mainHeaderMenuBtns.removeClass("active");
    $mainHeaderMenuBtns.eq(nextIndex).addClass("active");
    $homeWrapperInners.removeClass("active");
    $homeWrapperInners.eq(nextIndex).addClass("active");
    $homeSliderTrack.css("transform", `translateX(-${nextIndex * 100}%)`);
    centerMainHeaderMenuBtn(nextIndex, menuScrollBehavior);
    setHomeChromeHiddenByScroll(false);
  }

  function syncOpenPostFormBtnVisibility(menuIndex) {
    if ($openPostFormBtn.length === 0) return;
    $openPostFormBtn.toggle(menuIndex === 0);
  }

  function syncMessagePostBtnActive() {
    if ($messageInput.length === 0 || $messagePostBtn.length === 0) return;
    const hasValue = ($messageInput.val() || "").toString().trim().length > 0;
    $messagePostBtn.toggleClass("active", hasValue);
  }

  function showCreatePostTypeView() {
    if ($createPostTypeView.length === 0 || $createPostFormView.length === 0) return;
    $createPostFormView.addClass("hidden");
    $createPostTypeView.removeClass("hidden");
    $toUpSlideBackIcon.addClass("hidden");
    $toUpSlideCloseIcon.removeClass("hidden");
    $createPostSlideTitle.text("投稿");
  }

  function showCreatePostFormView() {
    if ($createPostTypeView.length === 0 || $createPostFormView.length === 0) return;
    $createPostTypeView.addClass("hidden");
    $createPostFormView.removeClass("hidden");
    $toUpSlideCloseIcon.addClass("hidden");
    $toUpSlideBackIcon.removeClass("hidden");
  }

  function syncCreatePostImageInputFiles() {
    if ($createPostImageInput.length === 0) return;
    if (typeof DataTransfer === "undefined") return;
    const dataTransfer = new DataTransfer();
    createPostSelectedFiles.forEach(function (file) {
      dataTransfer.items.add(file);
    });
    $createPostImageInput[0].files = dataTransfer.files;
  }

  function syncCreatePostSubmitBtnActive() {
    if ($createPostSubmitBtn.length === 0) return;
    const sourceText = activeCreatePostType === "yuzuri" ? $createPostYuzuriBody.val() : $createPostContent.val();
    const hasValue = (sourceText || "").toString().trim().length > 0;
    $createPostSubmitBtn.toggleClass("active", hasValue).prop("disabled", !hasValue);
  }

  function resetCreatePostFormState() {
    createPostSelectedFiles = [];
    syncCreatePostImageInputFiles();
    renderCreatePostImagePreview();
    $createPostContent.val("");
    $createPostTags.find(".createPostTagBtn").removeClass("is-active");
    $createPostAnonymousToggle.removeClass("is-active").attr("aria-pressed", "false");
    $createPostYuzuriTitle.val("");
    $createPostYuzuriBody.val("");
    $createPostYuzuriPrice.val("");
    $createPostYuzuriCategory.val("");
    $createPostYuzuriPlace.val("");
    $createPostEventName.val("");
    $createPostEventStartDate.val("");
    $createPostEventEndDate.val("");
    $createPostEventWrap.find(".createPostBinaryBtn").removeClass("is-active");
    $createPostEventWrap.find('.createPostBinaryBtn[data-group="eventHost"][data-value="no"]').addClass("is-active");
    $createPostEventWrap.find('.createPostBinaryBtn[data-group="eventRecruit"][data-value="off"]').addClass("is-active");
    syncCreatePostSubmitBtnActive();
  }

  function renderCreatePostImagePreview() {
    if ($createPostImagePreview.length === 0) return;
    $createPostImagePreview.empty();
    createPostSelectedFiles.forEach(function (file, index) {
      const imageUrl = URL.createObjectURL(file);
      $createPostImagePreview.append(`
        <div class="createPostImageTile">
          <div class="createPostImageThumb" style="background-image:url('${imageUrl}')"></div>
          <button type="button" class="createPostImageRemoveBtn" data-index="${index}" aria-label="画像を削除する">×</button>
        </div>
      `);
    });
    if (createPostSelectedFiles.length < CREATE_POST_MAX_IMAGES) {
      $createPostImagePreview.append(`
        <label for="createPostImageInput" class="createPostImageAddTile" aria-label="画像を追加する">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </label>
      `);
    }
  }

  function renderCreatePostTags(type) {
    const config = createPostTypeConfig[type];
    if (!config || !Array.isArray(config.tags) || $createPostTags.length === 0) return;
    $createPostTags.empty();
    const activeTags = Array.isArray(config.defaultActiveTags) ? config.defaultActiveTags : [];
    config.tags.forEach(function (tag) {
      const safeTag = $("<div>").text(tag).html();
      const isActive = activeTags.includes(tag) ? " is-active" : "";
      $createPostTags.append(`<button type="button" class="createPostTagBtn${isActive}">${safeTag}</button>`);
    });
  }

  function applyCreatePostType(type) {
    const nextType = (type || "").toString();
    const config = createPostTypeConfig[nextType];
    if (!config) return;
    activeCreatePostType = nextType;
    $createPostSlideTitle.text(config.title);
    $createPostContent.attr("placeholder", config.placeholder);
    $createPostSubmitBtn.text(config.submitLabel);
    renderCreatePostTags(nextType);
    syncCreatePostSubmitBtnActive();
    if (config.allowAnonymous) {
      $createPostAnonymousWrap.removeClass("hidden");
    } else {
      $createPostAnonymousWrap.addClass("hidden");
      $createPostAnonymousToggle.removeClass("is-active").attr("aria-pressed", "false");
    }
    if (config.allowEventFields) {
      $createPostEventWrap.removeClass("hidden");
    } else {
      $createPostEventWrap.addClass("hidden");
    }
    if (config.allowYuzuriFields) {
      $createPostDefaultTextWrap.addClass("hidden");
      $createPostTagsWrap.addClass("hidden");
      $createPostYuzuriDetailWrap.removeClass("hidden");
    } else {
      $createPostDefaultTextWrap.removeClass("hidden");
      $createPostTagsWrap.removeClass("hidden");
      $createPostYuzuriDetailWrap.addClass("hidden");
    }
  }

  if (maxHomeSlideIndex >= 0) {
    setHomeSlide(Math.min(homeSlideIndex, maxHomeSlideIndex), "auto");
  }
  $(".toLeftSlideInner[data-title='single']").remove();
  $("#userInfoSlide").remove();
  $toLeftSlideInners = $(".toLeftSlideInner");
  setNewsHeaderToggle(Math.max(0, $newsHeaderToggles.index($newsHeaderToggles.filter(".active"))));

  const initialBottomMenuIndex = $bottomMenus.index($bottomMenus.filter(".active"));
  $mainHeaderWrapper.toggleClass("hidden", initialBottomMenuIndex !== 0);
  syncOpenPostFormBtnVisibility(initialBottomMenuIndex);

  $mainHeaderMenuBtns.on("click", function () {
    setHomeSlide($mainHeaderMenuBtns.index(this));
  });

  $bottomMenus.on("click", function () {
    const menuIndex = $bottomMenus.index(this);

    $bottomMenus.removeClass("active");
    $(this).addClass("active");

    $contentsWrappers.removeClass("active");
    $contentsWrappers.eq(menuIndex).addClass("active");
    $mypageOptionSlide.removeClass("active");
    $mypageMainBody.removeClass("slideLeft");
    $profileEditSlide.removeClass("active");
    $mainHeaderWrapper.toggleClass("hidden", menuIndex !== 0);
    syncOpenPostFormBtnVisibility(menuIndex);
    setHomeChromeHiddenByScroll(false);
  });

  $openToLeftSlide.on("click", function () {
    const targetTitle = $(this).data("title") || $(this).attr("datat-title");

    if (targetTitle) {
      showToLeftSlideInner(targetTitle);
    }

    bringToLeftSlideToFront();
    $toLeftSlide.addClass("active");
    $toLeftSlide.removeClass("slideLeft");
    $homeInner.addClass("slideLeft");
  });

  $openToUpSlide.on("click", function () {
    showCreatePostTypeView();
    renderCreatePostImagePreview();
    $toUpSlide.removeClass("slideLeft");
    $toUpSlide.addClass("active");
  });

  $(document).on("click", ".openProfileEditSlide", function (event) {
    event.stopPropagation();
    $profileEditSlide.addClass("active");
  });

  $(document).on("click", ".closeProfileEditSlide", function () {
    $profileEditSlide.removeClass("active");
  });

  $(document).on("click", ".openMypageOptionSlide", function (event) {
    event.stopPropagation();
    $mypageOptionSlide.addClass("active");
    $mypageMainBody.addClass("slideLeft");
  });

  $(document).on("click", ".closeMypageOptionSlide", function () {
    $mypageOptionSlide.removeClass("active");
    $mypageMainBody.removeClass("slideLeft");
  });

  $profileEditImageInput.on("change", function () {
    const file = (this.files || [])[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    $profileEditSlide.find(".profileEditIcon").css("background-image", `url("${imageUrl}")`);
  });

  $closeToLeftSlide.on("click", function () {
    closeSingleActionSheet();
    $toLeftSlide.removeClass("active");
    $toLeftSlide.removeClass("slideLeft");
    if ($userInfoSlide.hasClass("active")) {
      bringUserInfoToFront();
    } else {
      resetSlideLayerOrder();
    }
    $homeInner.removeClass("slideLeft");
  });

  $closeToUpSlide.on("click", function () {
    if ($createPostFormView.length > 0 && !$createPostFormView.hasClass("hidden")) {
      resetCreatePostFormState();
      showCreatePostTypeView();
      return;
    }
    resetCreatePostFormState();
    showCreatePostTypeView();
    $toUpSlide.removeClass("slideLeft");
    $toUpSlide.removeClass("active");
  });

  $toLeftSlide.on("touchstart", function (event) {
    const touch = event.originalEvent.changedTouches[0];
    toLeftSlideTouchStartX = touch.clientX;
    toLeftSlideTouchStartY = touch.clientY;
  });

  $toLeftSlide.on("touchend", function (event) {
    if (!$toLeftSlide.hasClass("active")) return;
    const touch = event.originalEvent.changedTouches[0];
    const deltaX = touch.clientX - toLeftSlideTouchStartX;
    const deltaY = touch.clientY - toLeftSlideTouchStartY;

    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY) || deltaX <= 0) return;
    closeSingleActionSheet();
    $toLeftSlide.removeClass("active");
    $toLeftSlide.removeClass("slideLeft");
    if ($userInfoSlide.hasClass("active")) {
      bringUserInfoToFront();
    } else {
      resetSlideLayerOrder();
    }
    $homeInner.removeClass("slideLeft");
  });

  $toUpSlide.on("touchstart", function (event) {
    const touch = event.originalEvent.changedTouches[0];
    toUpSlideTouchStartX = touch.clientX;
    toUpSlideTouchStartY = touch.clientY;
  });

  $toUpSlide.on("touchend", function (event) {
    if (!$toUpSlide.hasClass("active")) return;
    if ($createPostFormView.length > 0 && !$createPostFormView.hasClass("hidden")) return;
    const touch = event.originalEvent.changedTouches[0];
    const deltaX = touch.clientX - toUpSlideTouchStartX;
    const deltaY = touch.clientY - toUpSlideTouchStartY;

    if (Math.abs(deltaY) < 50 || Math.abs(deltaY) <= Math.abs(deltaX) || deltaY <= 0) return;
    resetCreatePostFormState();
    showCreatePostTypeView();
    $toUpSlide.removeClass("slideLeft");
    $toUpSlide.removeClass("active");
  });

  $(document).on("click", ".createPostTypeBtn", function () {
    const type = ($(this).data("type") || "").toString();
    if (type !== "post" && type !== "oshiete" && type !== "recruit" && type !== "event" && type !== "yuzuri") return;
    applyCreatePostType(type);
    showCreatePostFormView();
  });

  $(document).on("click", ".createPostTagBtn", function () {
    $(this).toggleClass("is-active");
  });

  $createPostContent.on("input", function () {
    syncCreatePostSubmitBtnActive();
  });

  $createPostYuzuriBody.on("input", function () {
    syncCreatePostSubmitBtnActive();
  });

  $(document).on("focus", ".createPostDateInput", function () {
    this.type = "date";
  });

  $(document).on("blur", ".createPostDateInput", function () {
    if (!this.value) {
      this.type = "text";
    }
  });

  $createPostAnonymousToggle.on("click", function () {
    const nextState = !$(this).hasClass("is-active");
    $(this).toggleClass("is-active", nextState).attr("aria-pressed", nextState ? "true" : "false");
  });

  $(document).on("click", ".createPostBinaryBtn", function () {
    const group = ($(this).data("group") || "").toString();
    if (!group) return;
    $createPostEventWrap.find(`.createPostBinaryBtn[data-group="${group}"]`).removeClass("is-active");
    $(this).addClass("is-active");
  });

  $(document).on("click", ".openCreateTemplateSlide", function (event) {
    event.stopPropagation();
    openCreateTemplateSlide();
  });

  $createPostImageInput.on("change", function () {
    const nextFiles = Array.from(this.files || []);
    createPostSelectedFiles = createPostSelectedFiles.concat(nextFiles).slice(0, CREATE_POST_MAX_IMAGES);
    syncCreatePostImageInputFiles();
    renderCreatePostImagePreview();
  });

  $(document).on("click", ".createPostImageRemoveBtn", function () {
    const index = Number($(this).data("index"));
    if (Number.isNaN(index) || index < 0 || index >= createPostSelectedFiles.length) return;
    createPostSelectedFiles.splice(index, 1);
    syncCreatePostImageInputFiles();
    renderCreatePostImagePreview();
  });

  $userInfoSlide.on("touchstart", function (event) {
    const touch = event.originalEvent.changedTouches[0];
    userInfoSlideTouchStartX = touch.clientX;
    userInfoSlideTouchStartY = touch.clientY;
  });

  $userInfoSlide.on("touchend", function (event) {
    if (!$userInfoSlide.hasClass("active")) return;
    const touch = event.originalEvent.changedTouches[0];
    const deltaX = touch.clientX - userInfoSlideTouchStartX;
    const deltaY = touch.clientY - userInfoSlideTouchStartY;

    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY) || deltaX <= 0) return;
    closeUserInfoSlide();
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

  $(document).on("input", ".dynamicMessageInput", function () {
    const hasValue = ($(this).val() || "").toString().trim().length > 0;
    $(this)
      .closest(".dynamicSingleComposer")
      .find(".dynamicMessagePostBtn")
      .toggleClass("active", hasValue)
      .prop("disabled", !hasValue);
  });

  $(document).on("click", ".openDynamicMessageSlide", function (event) {
    event.stopPropagation();
    openDynamicMessageSlide();
  });

  $(document).on("click", ".messageListItem", function (event) {
    event.stopPropagation();
    openDynamicMessageSlide();
  });

  $(document).on("input", ".dynamicDmInput", function () {
    const hasValue = ($(this).val() || "").toString().trim().length > 0;
    $(this)
      .closest(".dynamicDmComposer")
      .find(".dynamicDmSendBtn")
      .toggleClass("active", hasValue)
      .prop("disabled", !hasValue);
  });

  $(document).on("click", ".dynamicFollowToggleBtn", function (event) {
    event.stopPropagation();
    const $btn = $(this);
    const isFollowing = $btn.hasClass("is-following");
    $btn.toggleClass("is-following", !isFollowing);
    $btn.text(isFollowing ? "フォローする" : "フォロー中");
  });

  $(document).on("click", ".dynamicDmProfileTrigger", function (event) {
    event.stopPropagation();
    const $trigger = $(this);
    const $panel = $trigger.closest(".dynamic-message");
    const $modal = $panel.find(".dynamicDmProfileModalRoot").first();
    if ($modal.length === 0) return;

    const profileImage = $trigger.css("background-image") || "";
    const profileName = ($trigger.data("profile-name") || "name").toString();
    const profileDesc = ($trigger.data("profile-desc") || "").toString();

    $modal.find(".dynamicDmProfileModalIcon").css("background-image", profileImage);
    $modal.find(".dynamicDmProfileModalName").text(profileName);
    $modal.find(".dynamicDmProfileModalDesc").text(profileDesc);
    $modal.attr("aria-hidden", "false").addClass("active");
  });

  $(document).on("click", ".dynamicDmProfileModalCurtain", function () {
    $(this).closest(".dynamicDmProfileModalRoot").attr("aria-hidden", "true").removeClass("active");
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
    if ($(this).closest(".dynamic-single").length > 0) return;
    openDynamicSingleFromPost($(this));
  });

  $(document).on("click", ".singleConfigBtn", function (event) {
    event.stopPropagation();
    openSingleActionSheet($(this).closest(".dynamicSlidePanel, .toLeftSlideInner"));
  });

  $(document).on("click", "#singleActionSheetCurtain", function () {
    closeSingleActionSheet($(this).closest("#singleActionSheetRoot"));
  });

  $(document).on("click", "#singleActionSheetCancel", function () {
    closeSingleActionSheet($(this).closest("#singleActionSheetRoot"));
  });

  $(document).on("click", ".cofigUserInfoSlide", function (event) {
    event.stopPropagation();
    openUserInfoActionSheet();
  });

  $userInfoActionSheetCurtain.on("click", function () {
    closeUserInfoActionSheet();
  });

  $userInfoActionSheetCancel.on("click", function () {
    closeUserInfoActionSheet();
  });

  $closeUserInfoSlide.on("click", function () {
    closeUserInfoSlide();
  });

  $(document).on("click", ".postLiIcon, .postLiCommentsLi > div:first-child, .singleCommentsLi > div:first-child", function (event) {
    event.stopPropagation();
    const $clickedIcon = $(event.target).closest(".icon_bg");
    const iconBackgroundImage = ($clickedIcon.length > 0 ? $clickedIcon.css("background-image") : $(this).css("background-image")) || "";
    openDynamicUserInfo(iconBackgroundImage);
  });

  $(document).on("click", ".searchShopItem", function (event) {
    event.stopPropagation();
    const iconBackgroundImage = ($(this).find(".icon_bg").first().css("background-image") || "").toString();
    openDynamicUserInfo(iconBackgroundImage);
  });

  $(document).on("click", ".dynamicPanelClose", function () {
    closeDynamicPanel($(this).closest(".dynamicSlidePanel"));
  });

  $(document).on("touchstart", ".dynamicSlidePanel", function (event) {
    const touch = event.originalEvent.changedTouches[0];
    dynamicPanelTouchStartX = touch.clientX;
    dynamicPanelTouchStartY = touch.clientY;
  });

  $(document).on("touchend", ".dynamicSlidePanel", function (event) {
    const $panel = $(this).closest(".dynamicSlidePanel");
    if (!$panel.hasClass("active")) return;
    if (!$panel.is($dynamicSlideRoot.children(".dynamicSlidePanel").last())) return;
    const touch = event.originalEvent.changedTouches[0];
    const deltaX = touch.clientX - dynamicPanelTouchStartX;
    const deltaY = touch.clientY - dynamicPanelTouchStartY;

    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY) || deltaX <= 0) return;
    closeDynamicPanel($panel);
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
    if (event.key !== "Escape") return;
    if ($postImageModal.hasClass("active")) {
      closePostImageModal();
    }
    if ($("#singleActionSheetRoot.active").length > 0) {
      closeSingleActionSheet();
    }
    if ($userInfoActionSheetRoot.hasClass("active")) {
      closeUserInfoActionSheet();
    }
    if ($userInfoSlide.hasClass("active")) {
      closeUserInfoSlide();
    }
    if ($toUpSlide.hasClass("active")) {
      resetCreatePostFormState();
      showCreatePostTypeView();
      $toUpSlide.removeClass("slideLeft");
      $toUpSlide.removeClass("active");
    }
  });

  randomizePostLiImages();
  setPostLiImagesLayout();
  syncMessagePostBtnActive();
  syncCreatePostSubmitBtnActive();

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

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/sw.js").catch(function (error) {
        console.error("Service Worker registration failed:", error);
      });
    });
  }
});
