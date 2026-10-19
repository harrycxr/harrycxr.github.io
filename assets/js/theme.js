// Robust binary theme toggle (Dark / Light) with persistent localStorage and zero-flicker transitions

// Toggle directly between light and dark
let toggleThemeSetting = () => {
  let current = determineComputedTheme();
  let next = current === "dark" ? "light" : "dark";
  setThemeSetting(next, true); // true = animate on user click
};

// Change the theme setting and apply the theme.
let setThemeSetting = (themeSetting, animate = false) => {
  try {
    localStorage.setItem("theme", themeSetting);
  } catch (e) {}

  document.documentElement.setAttribute("data-theme-setting", themeSetting);
  applyTheme(animate);
};

// Determine the computed theme ("dark" or "light")
let determineComputedTheme = () => {
  let themeSetting = null;
  try {
    themeSetting = localStorage.getItem("theme");
  } catch (e) {}

  if (themeSetting === "dark" || themeSetting === "light") {
    return themeSetting;
  }
  // Default to system preference if user hasn't explicitly set one
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
};

// Apply the computed dark or light theme to the website.
let applyTheme = (animate = false) => {
  let theme = determineComputedTheme();

  if (animate) {
    transTheme();
  }

  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.setAttribute("data-theme-setting", theme);

  try {
    setHighlight(theme);
  } catch (e) {}
  try {
    setGiscusTheme(theme);
  } catch (e) {}
  try {
    setSearchTheme(theme);
  } catch (e) {}

  if (typeof mermaid !== "undefined") {
    try {
      setMermaidTheme(theme);
    } catch (e) {}
  }

  if (typeof Diff2HtmlUI !== "undefined") {
    try {
      setDiff2htmlTheme(theme);
    } catch (e) {}
  }

  if (typeof echarts !== "undefined") {
    try {
      setEchartsTheme(theme);
    } catch (e) {}
  }

  if (typeof vegaEmbed !== "undefined") {
    try {
      setVegaLiteTheme(theme);
    } catch (e) {}
  }

  // Update table classes safely
  try {
    let tables = document.getElementsByTagName("table");
    for (let i = 0; i < tables.length; i++) {
      if (theme === "dark") {
        tables[i].classList.add("table-dark");
      } else {
        tables[i].classList.remove("table-dark");
      }
    }
  } catch (e) {}

  // Set jupyter notebooks themes safely
  try {
    let jupyterNotebooks = document.getElementsByClassName("jupyter-notebook-iframe-container");
    for (let i = 0; i < jupyterNotebooks.length; i++) {
      let iframes = jupyterNotebooks[i].getElementsByTagName("iframe");
      if (iframes.length > 0 && iframes[0].contentWindow && iframes[0].contentWindow.document) {
        let bodyElement = iframes[0].contentWindow.document.body;
        if (bodyElement) {
          bodyElement.setAttribute("data-jp-theme-light", theme === "dark" ? "false" : "true");
          bodyElement.setAttribute("data-jp-theme-name", theme === "dark" ? "JupyterLab Dark" : "JupyterLab Light");
        }
      }
    }
  } catch (e) {}

  // Update medium-zoom overlay
  if (typeof medium_zoom !== "undefined") {
    try {
      medium_zoom.update({
        background: getComputedStyle(document.documentElement).getPropertyValue("--global-bg-color") + "ee",
      });
    } catch (e) {}
  }
};

let setHighlight = (theme) => {
  let light = document.getElementById("highlight_theme_light");
  let dark = document.getElementById("highlight_theme_dark");
  if (theme === "dark") {
    if (light) light.media = "none";
    if (dark) dark.media = "";
  } else {
    if (dark) dark.media = "none";
    if (light) light.media = "";
  }
};

let setGiscusTheme = (theme) => {
  function sendMessage(message) {
    const iframe = document.querySelector("iframe.giscus-frame");
    if (!iframe) return;
    iframe.contentWindow.postMessage({ giscus: message }, "https://giscus.app");
  }

  sendMessage({
    setConfig: {
      theme: theme,
    },
  });
};

let addMermaidZoom = (records, observer) => {
  try {
    var svgs = d3.selectAll(".mermaid svg");
    svgs.each(function () {
      var svg = d3.select(this);
      svg.html("<g>" + svg.html() + "</g>");
      var inner = svg.select("g");
      var zoom = d3.zoom().on("zoom", function (event) {
        inner.attr("transform", event.transform);
      });
      svg.call(zoom);
    });
    observer.disconnect();
  } catch (e) {}
};

let setMermaidTheme = (theme) => {
  try {
    if (theme === "light") {
      theme = "default";
    }

    document.querySelectorAll(".mermaid").forEach((elem) => {
      let svgCode = elem.previousSibling.childNodes[0].innerHTML;
      elem.removeAttribute("data-processed");
      elem.innerHTML = svgCode;
    });

    mermaid.initialize({ theme: theme });
    window.mermaid.init(undefined, document.querySelectorAll(".mermaid"));

    const observable = document.querySelector(".mermaid svg");
    if (observable !== null) {
      var observer = new MutationObserver(addMermaidZoom);
      const observerOptions = { childList: true };
      observer.observe(observable, observerOptions);
    }
  } catch (e) {}
};

let setDiff2htmlTheme = (theme) => {
  try {
    document.querySelectorAll(".diff2html").forEach((elem) => {
      let textData = elem.previousSibling.childNodes[0].innerHTML;
      elem.innerHTML = "";
      const configuration = { colorScheme: theme, drawFileList: true, highlight: true, matching: "lines" };
      const diff2htmlUi = new Diff2HtmlUI(elem, textData, configuration);
      diff2htmlUi.draw();
    });
  } catch (e) {}
};

let setEchartsTheme = (theme) => {
  try {
    document.querySelectorAll(".echarts").forEach((elem) => {
      let jsonData = elem.previousSibling.childNodes[0].innerHTML;
      echarts.dispose(elem);

      if (theme === "dark") {
        var chart = echarts.init(elem, "dark-fresh-cut");
      } else {
        var chart = echarts.init(elem);
      }

      chart.setOption(JSON.parse(jsonData));
    });
  } catch (e) {}
};

let setVegaLiteTheme = (theme) => {
  try {
    document.querySelectorAll(".vega-lite").forEach((elem) => {
      let jsonData = elem.previousSibling.childNodes[0].innerHTML;
      elem.innerHTML = "";
      if (theme === "dark") {
        vegaEmbed(elem, JSON.parse(jsonData), { theme: "dark" });
      } else {
        vegaEmbed(elem, JSON.parse(jsonData));
      }
    });
  } catch (e) {}
};

let setSearchTheme = (theme) => {
  const ninjaKeys = document.querySelector("ninja-keys");
  if (!ninjaKeys) return;

  if (theme === "dark") {
    ninjaKeys.classList.add("dark");
  } else {
    ninjaKeys.classList.remove("dark");
  }
};

let transTheme = () => {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 400);
};

// Initialize theme immediately on script load
let initTheme = () => {
  // 1. Immediately apply theme to <html> before DOM finishes rendering
  let theme = determineComputedTheme();
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.setAttribute("data-theme-setting", theme);
  applyTheme(false); // NO transition animation on page load!

  // 2. Attach click listener once DOM elements are ready
  let attachListener = () => {
    const mode_toggle = document.getElementById("light-toggle");
    if (mode_toggle) {
      mode_toggle.onclick = function (e) {
        e.preventDefault();
        toggleThemeSetting();
      };
    }
    // Re-apply to all body elements safely
    applyTheme(false);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attachListener);
  } else {
    attachListener();
  }

  // 3. System preference change listener
  if (window.matchMedia) {
    try {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        if (!localStorage.getItem("theme")) {
          applyTheme(true);
        }
      });
    } catch (e) {}
  }
};

window.initTheme = initTheme;
window.toggleThemeSetting = toggleThemeSetting;

initTheme();
