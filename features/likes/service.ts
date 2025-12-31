import * as repo from './repo';

export const toggleLike = repo.toggleLike;
export const isLikedByUser = repo.isLikedByUser;
export const getLikesWithTemplates = repo.getLikesWithTemplates;
export const getLikedTemplateIds = repo.getLikedTemplateIds;

export type { Like, LikeWithTemplate } from './repo';
