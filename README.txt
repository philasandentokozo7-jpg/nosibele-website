NOSIBELE WEBSITE - HOW THIS FOLDER WORKS
=========================================
(This is a plain text file - it opens in Notepad by double-clicking.)


WHAT IS IN HERE
---------------
prod-build\      The actual website. This is what visitors see.
                 Every page already contains its full content in the
                 HTML, so Google and other search engines can read it.

build-tools\     A small robot script (prerender.js) that bakes the
                 page content into the HTML files. Netlify runs it
                 automatically - you never have to.

netlify.toml     Tells Netlify how to build and publish the site.


HOW TO PUT THE FIXED SITE LIVE TODAY (2 minutes, no skills needed)
------------------------------------------------------------------
1. Go to https://app.netlify.com and log in.
2. Click on your Nosibele site, then click "Deploys" in the menu.
3. Drag the whole "prod-build" folder from this folder onto the page
   where it says "drag and drop your site output folder here".
4. Wait about 30 seconds. Done - the SEO-fixed site is live.


HOW TO MAKE IT FULLY AUTOMATIC (one-time setup, about 10 minutes)
------------------------------------------------------------------
Once connected to GitHub, you (or Claude) change a file, and the
website updates itself. Steps:

1. Create a free account at https://github.com if you don't have one.
2. Ask Claude: "push the nosibele-website folder to my GitHub".
   Claude will tell you if anything needs to be installed first.
3. In Netlify: Site configuration -> Build & deploy ->
   "Link repository" -> choose GitHub -> pick "nosibele-website".
   Netlify reads netlify.toml automatically - accept and save.

From then on: every change pushed to GitHub rebuilds and republishes
the site automatically, with the SEO prerender always applied.


WHERE TO CHANGE THINGS (or just ask Claude to do it)
-----------------------------------------------------
Products, prices, descriptions ... prod-build\catalogue.js
Phone, address, hours, emails ..... prod-build\config.js
Photos ............................ prod-build\assets\

After changing anything, the site must be re-built (the automatic
GitHub + Netlify setup does this for you; otherwise ask Claude, or
run: cd build-tools, then: npm install, then: node prerender.js,
and drag prod-build to Netlify again).


IMPORTANT
---------
- Do not edit index.html / products.html etc. by hand - the build
  script overwrites the content section of those files.
- Keep this whole folder together. The zip in Downloads
  (Nosibele-SEO-crawlable-build.zip) is just a backup copy.
