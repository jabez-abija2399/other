import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import listRoutes from './routes/listRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', taskRoutes);
app.use('/api', listRoutes);
app.use('/api', dashboardRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
