from pydantic import BaseModel
from .agents import {{crew_name}}Agents
from .tasks import {{crew_name}}Tasks

from crewai import Crew, Process

class {{crew_name}}Crew(BaseModel):
	"""{{crew_name}} crew."""
	agents = {{crew_name}}Agents()
	tasks = {{crew_name}}Tasks()

	def crew(self):
		"""Kick off the {{crew_name}} crew."""
		return Crew(
			agents=self.agents.agents(),
			tasks=self.tasks.tasks(),
			process=Process.sequential,
			verbose=2
		)