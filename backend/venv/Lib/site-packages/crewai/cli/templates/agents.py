import inspect
from crewai import Agent

class {{crew_name}}Agents:
	"""Agents for your {{crew_name}} crew."""

	# Your agents defined here
	def your_agent(self):
		"""Create your first agent for {{crew_name}}."""
		return Agent(
			role="Agent Role",
			goal="Agent Goal",
			backstory="Agent Backstory"
		)