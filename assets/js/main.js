/* CrypTao - 交互脚本 */
(function () {
  "use strict";

  /* ---------- 移动端导航 ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");

  function closeNav() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") closeNav();
  });

  /* ---------- 商品渲染 + 分类筛选 ---------- */
  var grid = document.getElementById("productGrid");
  var filterBox = document.getElementById("filters");
  var emptyState = document.getElementById("emptyState");
  var products = window.CRYPTAO_PRODUCTS || [];

  function card(p) {
    var el = document.createElement("article");
    el.className = "card";
    var tag = p.tag ? '<span class="card-tag">' + p.tag + "</span>" : "";
    el.innerHTML =
      '<div class="card-media" aria-hidden="true">' +
      '<span class="card-initial">' + p.name.charAt(0) + "</span>" + tag +
      "</div>" +
      '<div class="card-body">' +
      '<span class="card-cat">' + p.category + "</span>" +
      "<h3>" + p.name + "</h3>" +
      '<p class="card-desc">' + p.desc + "</p>" +
      '<p class="card-price">' + p.price + "</p>" +
      "</div>";
    return el;
  }

  function render(list) {
    grid.innerHTML = "";
    list.forEach(function (p) {
      grid.appendChild(card(p));
    });
    emptyState.hidden = list.length !== 0;
  }

  function buildFilters() {
    var cats = ["全部"];
    products.forEach(function (p) {
      if (cats.indexOf(p.category) === -1) cats.push(p.category);
    });

    cats.forEach(function (c, i) {
      var b = document.createElement("button");
      b.className = "chip" + (i === 0 ? " is-active" : "");
      b.type = "button";
      b.textContent = c;
      b.addEventListener("click", function () {
        Array.prototype.forEach.call(filterBox.children, function (x) {
          x.classList.remove("is-active");
        });
        b.classList.add("is-active");
        render(c === "全部" ? products : products.filter(function (p) {
          return p.category === c;
        }));
      });
      filterBox.appendChild(b);
    });
  }

  buildFilters();
  render(products);

  /* ---------- 导航高亮 ---------- */
  var links = document.querySelectorAll(".primary-nav a");
  var sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("is-current", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- 联系表单（无后端，用邮件客户端发送） ---------- */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.elements.namedItem("name").value.trim();
    var email = form.elements.namedItem("email").value.trim();
    var message = form.elements.namedItem("message").value.trim();

    if (!name || !email || !message) {
      note.textContent = "请完整填写姓名、邮箱和留言内容。";
      note.className = "form-note is-error";
      return;
    }

    var subject = encodeURIComponent("网站留言 - " + name);
    var body = encodeURIComponent("来自：" + name + " <" + email + ">\n\n" + message);
    window.location.href = "mailto:hello@cryptao.example?subject=" + subject + "&body=" + body;

    note.textContent = "已打开邮件客户端，确认发送即可。也可直接加微信 CrypTao_Service。";
    note.className = "form-note is-ok";
    form.reset();
  });

  /* ---------- 页脚年份 ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
