import bcrypt from 'bcrypt'
import { z } from 'zod';

 const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


export const registerUser = async (req, res) => {
  const data = registerSchema.parse(req.body);

  // Check if the user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Hash the password and create the user
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const newUser = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });
  res.json(newUser);
} 
  
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
  
export const loginUser = async (req, res) => {
  
  const data = loginSchema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const validPassword = await bcrypt.compare(data.password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  // Generate a JWT token (in production, use a strong secret & secure options)
  const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
  res.json({ token });
}
  