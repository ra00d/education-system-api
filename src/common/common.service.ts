import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
@Injectable()
export class CommonService {
	async hashPassword(pass: string): Promise<string> {
		const salt = await bcrypt.genSalt();
		const password_hash = await bcrypt.hash(pass, salt);
		return password_hash;
	}
	flattenObject(obj: object, parentKey = "") {
		const result = {};

		for (const key in obj) {
			// biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
			if (obj.hasOwnProperty(key)) {
				const newKey = parentKey && key === "id" ? `${parentKey}.${key}` : key;

				if (typeof obj[key] === "object" && obj[key] !== null) {
					Object.assign(result, this.flattenObject(obj[key], newKey));
				} else {
					result[newKey] = obj[key];
				}
			}
		}
		return result;
	}
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	exclude<T>(obj: T, keys: string[]): { [k: string]: any } {
		const res = Object.fromEntries(
			Object.entries(obj).filter(([key]) => !keys.includes(key)),
		);
		return res;
	}
}
