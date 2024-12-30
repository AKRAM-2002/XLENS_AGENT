from .agents import {{crew_name}}Agents
from crewai import Task

class {{crew_name}}Tasks:
	"""Tasks for your {{crew_name}} crew."""
	agents = {{crew_name}}Agents()

	# Your tasks defined here
	def your_task(self):
		"""Create your first task for {{crew_name}}."""
		return Task(
			description="Task Description",
			expected_output="Expected Output from task",
			agent=self.agents.your_agent()
		)