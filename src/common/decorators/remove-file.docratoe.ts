import { SetMetadata } from "@nestjs/common";

export const IS_REMOVE = "fileRemove";
export const Public = () => SetMetadata(IS_REMOVE, true);
