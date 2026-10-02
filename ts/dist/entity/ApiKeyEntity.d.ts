import { LoopsEntityBase } from '../LoopsEntityBase';
import type { LoopsSDK } from '../LoopsSDK';
import type { Control } from '../types';
import type { ApiKey, ApiKeyLoadMatch } from '../LoopsTypes';
declare class ApiKeyEntity extends LoopsEntityBase<ApiKey> {
    constructor(client: LoopsSDK, entopts: any);
    make(this: ApiKeyEntity): ApiKeyEntity;
    load(this: any, reqmatch?: ApiKeyLoadMatch, ctrl?: Control): Promise<ApiKeyEntity>;
}
export { ApiKeyEntity };
