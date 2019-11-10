import { Document, Model, Types } from 'mongoose';

export type Query<T> = {
    [P in keyof T]?: T[P];
};

export interface Update<T> {
    $set?: {
        [P in keyof T]?: T[P]
    };
    $unset?: {
        [P in keyof T]?: 1
    };
}

export abstract class AbstractRepository<T extends Document> {

    protected model: Model<T>;

    protected constructor(model: Model<T>) {
        this.model = model;
    }

    public async find(q: Query<T>, select?: string): Promise<T[]> {
        return this.exec<T[]>(async (): Promise<T[]> => {
            return this.model.find(q, select).lean();
        });
    }
    public async findOne(q: Query<T>, select?: string): Promise<T> {
        return this.exec<T>(async (): Promise<T> => {
            return this.model.findOne(q, select).lean();
        });
    }

    public async findById(id: string | Types.ObjectId, select?: string): Promise<T | null> {
        return this.exec<T | null>(async (): Promise<T | null> => {
            return this.model.findById(id, select).lean();
        });
    }

    public async create(doc: T): Promise<T> {
        return this.exec(async (): Promise<T> => {
            return this.model.create(doc);
        });
    }

    public update(conditions: Query<T>, doc: Update<T>): Promise<{} | null> {
        return this.exec(async (): Promise<{} | null> => {
            return this.model.updateMany(conditions, doc);
        });
    }

    public delete(conditions: Query<T>): Promise<{} | null> {
        return this.exec(async (): Promise<{} | null> => {
            return this.model.deleteMany(conditions);
        });
    }

    public updateOne(conditions: Query<T>, doc: Update<T>): Promise<T | null> {
        return this.exec(async (): Promise<T | null> => {
            return this.model.findOneAndUpdate(conditions, doc, { new: true });
        });
    }

    // tslint:disable-next-line:max-line-length
    public async findByIdAndUpdate(id: string | Types.ObjectId, update: Update<T>, select?: string): Promise<T | null> {
        return this.exec(async (): Promise<T | null> => {
            // tslint:disable-next-line:max-line-length
            return this.model.findByIdAndUpdate(Types.ObjectId(String(id)), update, { select, new: true })
                .lean();
        });
    }

    protected async exec<R>(fn: () => Promise<R>): Promise<R> {
        try {
            return await fn();
        } catch (e) {
            throw e;
        }
    }

    //
    // aggregate(aggregations?: any[]): Aggregate<any[]>;
    // count(conditions: any, callback?: (err: any, count: number) => void): Query<number> & QueryHelpers;
    // create(...docs: any[]): Promise<T>;
    // create(...docsWithCallback: any[]): Promise<T>;
    //
    // createCollection(options?: mongodb.CollectionCreateOptions, cb?: (err: any) => void): Promise<void>;
    // find(callback?: (err: any, res: T[]) => void): DocumentQuery<T[], T> & QueryHelpers;
    // find(conditions: any, callback?: (err: any, res: T[]) => void): DocumentQuery<T[], T> & QueryHelpers;
    // find(conditions: any, projection?: any | null,
    // 	 callback?: (err: any, res: T[]) => void): DocumentQuery<T[], T> & QueryHelpers;
    // find(conditions: any, projection?: any | null, options?: any | null,
    // 	 callback?: (err: any, res: T[]) => void): DocumentQuery<T[], T> & QueryHelpers;
    //
    // findByIdAndRemove(): DocumentQuery<T | null, T> & QueryHelpers;
    // findByIdAndRemove(id: any | number | string,
    // 				  callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T> & QueryHelpers;
    // findByIdAndRemove(id: any | number | string, options: QueryFindOneAndRemoveOptions,
    // 				  callback?: (err: any, res: mongodb.FindAndModifyWriteOpResultObject<T | null>) => void)
    // 	: Query<mongodb.FindAndModifyWriteOpResultObject<T | null>> & QueryHelpers;
    // findByIdAndRemove(id: any | number | string, options: QueryFindOneAndRemoveOptions, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T> & QueryHelpers;
    //
    // findByIdAndDelete(): DocumentQuery<T | null, T> & QueryHelpers;
    // findByIdAndDelete(id: any | number | string,
    // 				  callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T> & QueryHelpers;
    // findByIdAndDelete(id: any | number | string, options: QueryFindOneAndRemoveOptions,
    // 				  callback?: (err: any, res: mongodb.FindAndModifyWriteOpResultObject<T | null>) => void)
    // 	: Query<mongodb.FindAndModifyWriteOpResultObject<T | null>> & QueryHelpers;
    // findByIdAndDelete(id: any | number | string, options: QueryFindOneAndRemoveOptions, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T> & QueryHelpers;
    // findByIdAndUpdate(): DocumentQuery<T | null, T> & QueryHelpers;
    // findByIdAndUpdate(id: any | number | string, update: any,
    // 				  callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T> & QueryHelpers;
    // findByIdAndUpdate(id: any | number | string, update: any,
    // 				  options: { rawResult: true } & { upsert: true } & { new: true } & QueryFindOneAndUpdateOptions,
    // 				  callback?: (err: any, res: T) => void): DocumentQuery<T, T> & QueryHelpers;
    // findByIdAndUpdate(id: any | number | string, update: any,
    // 				  options: { upsert: true, new: true } & QueryFindOneAndUpdateOptions,
    // 				  callback?: (err: any, res: mongodb.FindAndModifyWriteOpResultObject<T>) => void)
    // 	: Query<mongodb.FindAndModifyWriteOpResultObject<T>> & QueryHelpers;
    // findByIdAndUpdate(id: any | number | string, update: any,
    // 				  options: { rawResult : true } & QueryFindOneAndUpdateOptions,
    // 				  callback?: (err: any, res: mongodb.FindAndModifyWriteOpResultObject<T | null>) => void)
    // 	: Query<mongodb.FindAndModifyWriteOpResultObject<T | null>> & QueryHelpers;
    // findByIdAndUpdate(id: any | number | string, update: any,
    // 				  options: QueryFindOneAndUpdateOptions,
    // 				  callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T> & QueryHelpers;
    //
    // findOne(conditions?: any,
    // 		callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T> & QueryHelpers;
    // findOne(conditions: any, projection: any,
    // 		callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T> & QueryHelpers;
    // findOne(conditions: any, projection: any, options: any,
    // 		callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T> & QueryHelpers;
    //
    // findOneAndRemove(): DocumentQuery<T | null, T> & QueryHelpers;
    // findOneAndRemove(conditions: any,
    // 				 callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T> & QueryHelpers;
    // findOneAndRemove(conditions: any, options: { rawResult: true } & QueryFindOneAndRemoveOptions,
    // 				 callback?: (err: any, doc: mongodb.FindAndModifyWriteOpResultObject<T | null>, res: any) => void)
    // 	: Query<mongodb.FindAndModifyWriteOpResultObject<T | null>> & QueryHelpers;
    // findOneAndRemove(conditions: any, options: QueryFindOneAndRemoveOptions, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T> & QueryHelpers;
    //
    // findOneAndDelete(): DocumentQuery<T | null, T> & QueryHelpers;
    // findOneAndDelete(conditions: any,
    // 				 callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T> & QueryHelpers;
    // findOneAndDelete(conditions: any, options: { rawResult: true } & QueryFindOneAndRemoveOptions,
    // 				 callback?: (err: any, doc: mongodb.FindAndModifyWriteOpResultObject<T | null>, res: any) => void)
    // 	: Query<mongodb.FindAndModifyWriteOpResultObject<T | null>> & QueryHelpers;
    // findOneAndDelete(conditions: any, options: QueryFindOneAndRemoveOptions, callback?: (err: any, res: T | null) => void): DocumentQuery<T | null, T> & QueryHelpers;
    //
    // findOneAndUpdate(): DocumentQuery<T | null, T> & QueryHelpers;
    // findOneAndUpdate(conditions: any, update: any,
    // 				 callback?: (err: any, doc: T | null, res: any) => void): DocumentQuery<T | null, T> & QueryHelpers;
    // findOneAndUpdate(conditions: any, update: any,
    // 				 options: { rawResult : true } & { upsert: true, new: true } & QueryFindOneAndUpdateOptions,
    // 				 callback?: (err: any, doc: mongodb.FindAndModifyWriteOpResultObject<T>, res: any) => void)
    // 	: Query<mongodb.FindAndModifyWriteOpResultObject<T>> & QueryHelpers;
    // findOneAndUpdate(conditions: any, update: any,
    // 				 options: { upsert: true, new: true } & QueryFindOneAndUpdateOptions,
    // 				 callback?: (err: any, doc: T, res: any) => void): DocumentQuery<T, T> & QueryHelpers;
    // findOneAndUpdate(conditions: any, update: any,
    // 				 options: { rawResult: true } & QueryFindOneAndUpdateOptions,
    // 				 callback?: (err: any, doc: mongodb.FindAndModifyWriteOpResultObject<T | null>, res: any) => void)
    // 	: Query<mongodb.FindAndModifyWriteOpResultObject<T | null>> & QueryHelpers;
    // findOneAndUpdate(conditions: any, update: any,
    // 				 options: QueryFindOneAndUpdateOptions,
    // 				 callback?: (err: any, doc: T | null, res: any) => void): DocumentQuery<T | null, T> & QueryHelpers;
    //
    // insertMany(doc: any, callback?: (error: any, doc: T) => void): Promise<T>;
    // init(callback?: (err: any) => void): Promise<T>;
    //
    // remove(conditions: any, callback?: (err: any) => void): Query<mongodb.DeleteWriteOpResultObject['result']> & QueryHelpers;
    // deleteOne(conditions: any, callback?: (err: any) => void): Query<mongodb.DeleteWriteOpResultObject['result']> & QueryHelpers;
    // deleteMany(conditions: any, callback?: (err: any) => void): Query<mongodb.DeleteWriteOpResultObject['result']> & QueryHelpers;
    // replaceOne(conditions: any, replacement: any, callback?: (err: any, raw: any) => void): Query<any> & QueryHelpers;
    //
    // update(conditions: any, doc: any,
    // 	   callback?: (err: any, raw: any) => void): Query<any> & QueryHelpers;
    // update(conditions: any, doc: any, options: ModelUpdateOptions,
    // 	   callback?: (err: any, raw: any) => void): Query<any> & QueryHelpers;
    // updateOne(conditions: any, doc: any,
    // 		  callback?: (err: any, raw: any) => void): Query<any> & QueryHelpers;
    // updateOne(conditions: any, doc: any, options: ModelUpdateOptions,
    // 		  callback?: (err: any, raw: any) => void): Query<any> & QueryHelpers;
    // updateMany(conditions: any, doc: any,
    // 		   callback?: (err: any, raw: any) => void): Query<any> & QueryHelpers;
    // updateMany(conditions: any, doc: any, options: ModelUpdateOptions,
    // 		   callback?: (err: any, raw: any) => void): Query<any> & QueryHelpers;
}
