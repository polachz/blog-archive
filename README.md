# Blog

Have a peek »»» [https://polach.me](https://polach.me)

## Source

This blog code is based on Atte Juvonen's starter [https://github.com/baobabKoodaa/blog](https://github.com/baobabKoodaa/blog)

Instead of fork the Starter, I provided deep copy of the code and then have started to modify it for my needs. 


## Features from Original Starter

- **Responsive** and streamlined design.
- GatsbyJS compiles the blog into HTML+CSS+JS so **hosting the blog costs nothing** at providers like Netlify.
- **Blazing fast** UX: The website is visible and functional after only 1 round trip and ~20kB of data. That first round trip can be super fast to anywhere in the world, because the blog is only static assets which can be delivered by CDN. Subsequent pageloads render ~instantly thanks to link prefetching.
- Autogenerated **tracedSVG image placeholders** are stylized to create a smooth look and transition as the image loads without the page jumping around.
- Write blog posts into **Markdown** files (easy to format and content will not be married to any platform).
- **Expandable**: possible to embed custom React components into Markdown.
- Posts organized by **tags**.
- **Teasers** of posts are generated to front page with **infinite scroll** which gracefully degrades into **pagination**.
- Allow readers to be notified of updates with **RSS feed** and email newsletter.
- Contact Form.
- **gatsby-remark-grid-tables** To allow more feature rich tables

## My Additional Improvements and Mods

- Allowed to change site navbar color and apperence just by modify the theme.yaml file
- Fixed ordered lists to work properly
- Allowed to specify image size, word wrapping and many more by [gatsby-remark-image-attributes](https://www.gatsbyjs.com/plugins/gatsby-remark-image-attributes/)
- Implement syntax highligting by [PRISM](https://prismjs.com/) and [gatsby-remark-prismjs](https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs/) plugin
- Improved table support (merge or split some cells) by [gatsby-remark-grid-tables](https://www.gatsbyjs.com/plugins/gatsby-remark-grid-tables/)
- Comments based on GitHub Issue system powered by [utterances](https://utteranc.es)

## Feel Free to Fork But on Your Own Risk

[![License: MIT](badge-mit.svg)](https://opensource.org/licenses/MIT)
[![License: CC BY 4.0](badge-cc.svg)](https://creativecommons.org/licenses/by/4.0/)

I do not have ambition to provide next Gatsby Starter. I publish my blog code on GitHub just because maybe someone can find some my mods useful and use it on its own site. 
But if you really want to clone my repo and use it as your starter then do it (code is MIT licensed). Use [baobabKoodaa](https://github.com/baobabKoodaa/blog) steps to do that, but without any warranty. You can try to get missing files in the `content` and the `static` folder from original [baobabKoodaa](https://github.com/baobabKoodaa/blog) starter and probably things will work. But I do not grant this. You have to try.


### Environment Variables Used by the Code and Other Code Possibilities

- **EMAIL_SUB_LINK** If you can use e-mali newsletter then you have to specify subscription link here. Otherwise remove appropriate icon and link on the Follow page
- There is a Contact page. Remove it or set up handling for your form submissions. The POST address where forms are sent is defined in environment variable `CONTACT_POST_ADDRESS`. I'm using Google Script to handle form submissions. If you also want to use Google Script, [instructions are here](https://github.com/dwyl/learn-to-send-email-via-google-script-html-no-server) and [here is an improved version of the script](handleFormSubmission.gs).
- **GOOGLE_ANALYTICS_ID** Specify here Google Analytics id if you can use this site visit reporting system
- **COMMENTS_GITHUB_REPO** If you can use comments by [utterances](https://utteranc.es) on your post pages, follow steps from [here](https://dev.to/creativcoder/how-to-add-comment-support-on-your-gatsby-blog-using-github-utterances-423n) to create GitHub repo to provide comments and then place here this repo path ("github_user/repo_name")
- [OPTIONAL] If you want a "Hero" section at the top of the home page, just set `hero.hide` to `false` in `theme.yaml`.
- [OPTIONAL] If you want a Search page with Algolia: mostly follow instructions from [here](https://dev.greglobinski.com/setup-algolia-account/). Search for commented out code with 'algolia'.
- Creating content
    - Blog posts are expected in the `content/posts` folder. I'm using Git Submodule for whole `content` folder.
    - When you create posts, a folder with a name like `2020-03-05--my-book-review` will be published, whereas a name like `my-book-review` will be considered a draft and will not be published. There are ways to accidentally publish drafts. If you are worried about that, the easiest way to avoid it is to deploy your site from GitHub via Netlify and _never commit draft posts to the repo_.
    - You have to manually crop images to 2.222 aspect ratio.




