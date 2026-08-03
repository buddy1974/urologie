import "fastify";
import { FastifyRequest, FastifyReply } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    requireStaff: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    requireFreigabeRole: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    requirePatient: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}
