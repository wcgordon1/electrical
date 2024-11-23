import"https://unpkg.com/mailgo@0.12.2/dist/mailgo.min.js";const a=document.getElementById("contactForm"),s=document.getElementById("submitButton"),e=document.getElementById("statusMessage");a?.addEventListener("submit",async function(o){o.preventDefault();const r=new FormData(this);try{s.innerHTML="Sending...",s.disabled=!0,e.classList.add("hidden");const n=await(await fetch("/api/contact",{method:"POST",body:r})).json();if(n.success)e.classList.remove("hidden"),e.classList.add("bg-green-50","text-green-800"),e.innerHTML=`
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M5 12l5 5l10 -10" />
            </svg>
            <span>Thank you for reaching out! We'll get back to you within 24-48 hours.</span>
          </div>
        `,setTimeout(()=>{a.reset(),e.classList.add("hidden")},3e3);else throw new Error(n.error)}catch(t){e.classList.remove("hidden"),e.classList.add("bg-red-50","text-red-800"),e.innerHTML=`
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M12 9v4" />
            <path d="M12 16v.01" />
          </svg>
          <span>Error: ${t.message||"There was an error sending your message. Please try again or email us directly at hello@bestelectricianjobs.com"}</span>
        </div>
      `}finally{s.disabled=!1,s.innerHTML="Send Message"}});
