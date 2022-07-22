[← back](/blog)

# Hosting a README blog

Hey!
So it turns out, if you enable GitHub pages on a repo, and only have `.md` files lying around, GitHub will just render them into HTML for you.
Pretty nice!

## How?

So, after enabling GitHub Pages, I'm guessing GitHub has some way of detecting whether it needs to run some actions?
I mean, it must, because Actions were automatically set up to run on each push:

[![GitHub Actions](/assets/github.com_broothie_blog_actions_runs_2715808229.png)](https://github.com/broothie/blog/actions/runs/2715818051)

My guess is it looks for an `index.html` or something?
And if conditions are right, it seems to drop into Jekyll to generate the website assets.
