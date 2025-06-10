// Your script here.
      const voicesDropdown = document.getElementById("voices");

      function populateVoices() {
        allVoices = speechSynthesis.getVoices();
        if (allVoices.length === 0) return; // No voices available
        voicesDropdown.innerHTML = '<option value="">Select A Voice</option>';
        allVoices.forEach((voice, i) => {
          let option = document.createElement("option");
          option.value = i;
          option.innerText = `${voice.name} (${voice.lang})`;
          voicesDropdown.appendChild(option);
        });
      }

      // Run it once
      populateVoices();

      // Add the event listener in case voices load asynchronously
      speechSynthesis.addEventListener("voiceschanged", populateVoices);

      let playRate = 1;
      rate.addEventListener("change", (event) => {
        playRate = event.target.value;
      });

      let playPitch = 1;
      pitch.addEventListener("change", (event) => {
        playPitch = event.target.value;
      });


      let message;
      speak.addEventListener("click", () => {
        const text = document.querySelector('[name="text"]').value;
        if (text != "") {
          message = new SpeechSynthesisUtterance(text);
          message.pitch = playPitch;
          message.rate = playRate;

          const selectedVoiceIndex = voicesDropdown.value;
          if (selectedVoiceIndex) {
            message.voice = allVoices[selectedVoiceIndex];
          } else if (allVoices.length > 0) {
            alert("Select voice");
            return;
          }
          // console.log("hello");
          // speechSynthesis.pause();
          // console.log("tete");
          speechSynthesis.speak(message);
        } else {
          alert("Enter some text");
        }
      });

      voicesDropdown.addEventListener("change", (event) => {
        if (speechSynthesis.speaking) {
          speechSynthesis.cancel();
          
          setTimeout(() => {
            speak.click();
            
          }, 200);

          
        }
      });

