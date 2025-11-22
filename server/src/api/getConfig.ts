import { FastifyRequest, FastifyReply } from "fastify";
import { DISABLE_SIGNUP, MAPBOX_TOKEN, getOIDCProviders, getSocialProviders } from "../lib/const.js";

export async function getConfig(_: FastifyRequest, reply: FastifyReply) {
  return reply.send({
    disableSignup: DISABLE_SIGNUP,
    mapboxToken: MAPBOX_TOKEN,
    enabledOIDCProviders: getOIDCProviders().map((provider) => {
      return {
        providerId: provider.providerId,
        name: provider.name,
      }
    }),
    enabledSocialProviders: Object.keys(getSocialProviders()),
  });
}
