import admin from "./admin";
import * as express from 'express';

export interface customRequest extends express.Request {
    user: admin.auth.DecodedIdToken;
}
