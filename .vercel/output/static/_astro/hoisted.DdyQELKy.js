import"https://unpkg.com/mailgo@0.12.2/dist/mailgo.min.js";const m=document.getElementById("openModal"),p=document.getElementById("openModalBottom"),r=document.getElementById("applicationModal");m?.addEventListener("click",()=>{r.showModal()});p?.addEventListener("click",()=>{r.showModal()});const s=document.getElementById("copyLink");s?.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(window.location.href);const e=s.innerHTML;s.innerHTML=`
        <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 13l4 4L19 7"/>
        </svg>
      `,setTimeout(()=>{s.innerHTML=e},2e3)}catch(e){console.error("Failed to copy:",e)}});const n=document.getElementById("applicationModal"),u=document.getElementById("closeModal"),d=document.getElementById("modalOverlay"),g=document.getElementById("modalContent"),a=document.getElementById("applicationForm");u?.addEventListener("click",()=>{n.close()});g?.addEventListener("click",e=>{e.stopPropagation()});d?.addEventListener("click",e=>{e.target===d&&n.close()});document.addEventListener("keydown",e=>{e.key==="Escape"&&n.open&&n.close()});a?.addEventListener("submit",async e=>{e.preventDefault();const c=new FormData(a),o=document.getElementById("submitButton"),t=document.getElementById("statusMessage");try{o.disabled=!0,o.innerHTML="Sending...",t.classList.add("hidden");const l=await(await fetch("/api/apply",{method:"POST",body:c})).json();if(l.success)t.classList.remove("hidden"),t.classList.add("bg-green-50","text-green-800"),t.innerHTML=`
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M5 12l5 5l10 -10" />
            </svg>
            <span>Application submitted successfully! We'll be in touch soon.</span>
          </div>
        `,setTimeout(()=>{a.reset(),n.close()},2e3);else throw new Error(l.error)}catch(i){t.classList.remove("hidden"),t.classList.add("bg-red-50","text-red-800"),t.innerHTML=`
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M12 9v4" />
            <path d="M12 16v.01" />
          </svg>
          <span>Error: ${i.message||"There was an error submitting your application. Please try again."}</span>
        </div>
      `}finally{o.disabled=!1,o.innerHTML="Submit Application"}});
