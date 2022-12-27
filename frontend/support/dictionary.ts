import { Builder } from "builder-pattern";

export const displayReaction = {
    like: Builder<any>().action('like').style('text-blue-500').icon('/images/reaction/like.png').gif('/images/reaction/gif/like.gif').build(),
    heart: Builder<any>().action('heart').style('text-red-500').icon('/images/reaction/heart.png').gif('/images/reaction/gif/heart.gif').build(),
    wow: Builder<any>().action('wow').style('text-yellow-500').icon('/images/reaction/wow.png').gif('/images/reaction/gif/wow.gif').build(),
    haha: Builder<any>().action('haha').style('text-yellow-500').icon('/images/reaction/haha.png').gif('/images/reaction/gif/haha.gif').build(),
    sad: Builder<any>().action('sad').style('text-yellow-500').icon('/images/reaction/sad.png').gif('/images/reaction/gif/sad.gif').build(),
    angry: Builder<any>().action('angry').style('text-orange-500').icon('/images/reaction/angry.png').gif('/images/reaction/gif/angry.gif').build(),
}