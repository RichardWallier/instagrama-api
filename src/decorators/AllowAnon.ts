import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'AllowAnon';
export const AllowAnon = () => SetMetadata(IS_PUBLIC_KEY, true);
