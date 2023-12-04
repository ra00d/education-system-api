import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { IS_PUBLIC } from "src/common/decorators/public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtServie: JwtService,
		private configServie: ConfigService,
		private reflector: Reflector,
	) {}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
			context.getHandler(),
			context.getClass(),
		]);
		if (isPublic) {
			// 💡 See this condition
			return true;
		}
		const req = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(req);
		if (!token) {
			throw new UnauthorizedException();
		}
		try {
			const payload = await this.jwtServie.verifyAsync(token, {
				secret: this.configServie.get("JWT_SECRET"),
			});
			req.user = payload;
		} catch {
			throw new UnauthorizedException();
		}
		return true;
	}
	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(" ") ?? [];
		return type === "Bearer" ? token : undefined;
	}
}
