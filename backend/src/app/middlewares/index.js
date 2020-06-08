import AuthMiddleware from './auth';
import AdminMiddleware from './adminAuth';

export const auth = AuthMiddleware;
export const admin = AdminMiddleware;
