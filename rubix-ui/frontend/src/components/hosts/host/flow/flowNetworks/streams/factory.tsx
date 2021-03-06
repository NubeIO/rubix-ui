import {main, model} from "../../../../../../../wailsjs/go/models";
import {
    AddStream,
    DeleteStream,
    DeleteStreamBulk,
    EditStream,
    GetStream,
    GetStreams,
} from "../../../../../../../wailsjs/go/main/App";
import {Helpers} from "../../../../../../helpers/checks";

function hasUUID(uuid: string): Error {
    return Helpers.IsUndefined(uuid, "host or connection uuid") as Error
}


export class FlowStreamFactory {
    hostUUID!: string;
    connectionUUID!: string;
    
    async GetAll(): Promise<Array<model.Stream>> {
        let all: Promise<Array<model.Stream>> = {} as Promise<Array<model.Stream>>
        hasUUID(this.connectionUUID)
        hasUUID(this.hostUUID)
        await GetStreams(this.connectionUUID, this.hostUUID).then(res => {
            all = res as unknown as Promise<Array<model.Stream>>
        }).catch(err => {
            return undefined
        })
        return all
    }

    async GetOne(uuid:string): Promise<model.Stream> {
        hasUUID(this.connectionUUID)
        hasUUID(this.hostUUID)
        let resp: model.Stream = {} as model.Stream
        await GetStream(this.connectionUUID, this.hostUUID, uuid).then(res => {
            resp = res as model.Stream
        }).catch(err => {
            return undefined
        })
        return resp
    }


    async Add(body: model.Stream): Promise<model.Stream> {
        hasUUID(this.connectionUUID)
        hasUUID(this.hostUUID)
        let resp: model.Stream = {} as model.Stream
        await AddStream(this.connectionUUID, this.hostUUID, body).then(res => {
            resp = res as model.Stream
        }).catch(err => {
            return undefined
        })
        return resp
    }

    async Update(uuid:string, body: model.Stream): Promise<model.Stream> {
        hasUUID(this.connectionUUID)
        hasUUID(this.hostUUID)
        let resp: model.Stream = {} as model.Stream
        await EditStream(this.connectionUUID, this.hostUUID, uuid, body).then(res => {
            resp = res as model.Stream
        }).catch(err => {
            return undefined
        })
        return resp
    }

    async Delete(uuid:string): Promise<model.Stream> {
        hasUUID(this.connectionUUID)
        hasUUID(this.hostUUID)
           let resp: model.Stream = {} as model.Stream
        await DeleteStream(this.connectionUUID, this.hostUUID, uuid).then(res => {
            resp = res as model.Stream
        }).catch(err => {
            return undefined
        })
        return resp
    }

    async BulkDelete(uuids: Array<main.UUIDs>): Promise<any> {
        hasUUID(this.connectionUUID)
        hasUUID(this.hostUUID)
        let out: Promise<any> = {} as Promise<any>
        await DeleteStreamBulk(this.connectionUUID, this.hostUUID, uuids).then(res => {
            out = res as Promise<any>
        }).catch(err => {
            return undefined
        })
        return out
    }


}