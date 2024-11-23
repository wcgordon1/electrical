import"https://unpkg.com/mailgo@0.12.2/dist/mailgo.min.js";const n=document.getElementById("jobPostForm"),s=document.getElementById("submitButton"),e=document.getElementById("statusMessage");n?.addEventListener("submit",async r=>{r.preventDefault();const a=new FormData(n);try{s.disabled=!0,s.innerHTML="Posting...",e?.classList.add("hidden");const o=await(await fetch("/api/jobdescription",{method:"POST",body:a})).json();if(o.success)e?.classList.remove("hidden"),e?.classList.add("bg-green-50","text-green-800"),e.innerHTML=`
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M5 12l5 5l10 -10" />
            </svg>
            <span>Job posted successfully!</span>
          </div>
        `,n.reset();else throw new Error(o.error)}catch(t){e?.classList.remove("hidden"),e?.classList.add("bg-red-50","text-red-800"),e.innerHTML=`
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M12 9v4" />
            <path d="M12 16v.01" />
          </svg>
          <span>Error: ${t instanceof Error?t.message:"Failed to post job. Please try again."}</span>
        </div>
      `}finally{s.disabled=!1,s.innerHTML="Post Job"}});
