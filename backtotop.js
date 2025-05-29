const backToTop = {
    button: null, 
    scrollThreshold: 100,
    steps: 20,
    alertMessages: [
      "Du er tilbage, hvor æstetikken begynder.",
      "Et smukt hjem starter fra toppen.",
      "Toppen er lige så stilfuld som din indretning!"
    ],
  
    init: function () {
      console.log("BackToTop init");
  
      this.button = document.getElementById("backToTopBtn");
  
      window.addEventListener("scroll", () => {
        let currentScroll = window.scrollY;
        if (currentScroll > this.scrollThreshold) {
          this.button.style.display = "block";
        } else {
          this.button.style.display = "none";
        }
      });
  
      this.button.addEventListener("click", () => {
        let randomIndex = Math.floor(Math.random() * this.alertMessages.length);
        alert(this.alertMessages[randomIndex]);
        this.smoothScrollToTop();
      });
    },
    //https://www.kirupa.com/html5/shuffling_array_js.htm
  
    smoothScrollToTop: function () {
      let position = window.scrollY;
      let scrollSteps = position / this.steps;
  
      let interval = setInterval(() => {
        if (position > 0) {
          position -= scrollSteps;
          window.scrollTo(0, position);
        } else {
          clearInterval(interval);
        }
      }, 10);
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    backToTop.init();
  });
  
  //https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
  //Følgende funktion er udviklet med assistance fra ChatGPT (OpenAI), maj 2025