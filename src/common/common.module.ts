import { AxiosAdapter } from './adapter/axios.adapter';
import { Module } from '@nestjs/common';

@Module({
    providers:[AxiosAdapter],
    exports:[AxiosAdapter]
})
export class CommonModule {}
