import z from "zod";

const forgotPasswordSchema = z.object({
    email: z.string().email(),
});
const resetPasswordSchema = z
    .object({
        token: z.string().min(6, "Token is required"),
        password: z.string().min(8),
        confirmPassword: z.string().min(8),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });
const signInFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(7),
    rememberMe: z.boolean().optional(),
});
const signUpFormSchema = z
    .object({
        firstName: z.string().min(2),
        lastName: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(7),
        confirmPassword: z.string().min(7),
        image: z.instanceof(File).optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })
    .refine(
        (data) => (data.image ? data.image.size <= 2 * 1024 * 1024 : true),
        {
            message: "Image size must be less than 2MB",
            path: ["image"],
        }
    );
export const authSchema = {
    forgotPassword: forgotPasswordSchema,
    resetPassword: resetPasswordSchema,
    signIn: signInFormSchema,
    signUp: signUpFormSchema,
};
export namespace AuthSchema {
    export type ForgotPassword = z.infer<typeof forgotPasswordSchema>;
    export type ResetPassword = z.infer<typeof resetPasswordSchema>;
    export type SignIn = z.infer<typeof signInFormSchema>;
    export type SignUp = z.infer<typeof signUpFormSchema>;
}
